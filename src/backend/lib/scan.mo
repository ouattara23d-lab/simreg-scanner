import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Types "../types/scan";

module {
  public type SessionStore = Map.Map<Text, Types.ScanSession>;

  /// OCR.space API endpoint
  public let OCR_API_URL : Text = "https://api.ocr.space/parse/image";

  /// OCR.space free API key (default free tier key)
  public let OCR_API_KEY : Text = "helloworld";

  /// Build the POST body for the OCR.space API request (multipart-form encoded).
  public func buildOcrRequestBody(imageBase64 : Text, _documentType : Types.DocumentType) : Text {
    "apikey=" # OCR_API_KEY # "&base64Image=data:image/jpeg;base64," # imageBase64 # "&OCREngine=2&isTable=false&detectOrientation=true&scale=true&language=fre"
  };

  /// Extract the plain text from an OCR.space JSON response.
  /// OCR.space wraps the text in: "ParsedText":"<value>"
  /// We locate the marker and scan to the next unescaped quote.
  public func extractParsedText(rawJson : Text) : ?Text {
    let marker = "\"ParsedText\":\"";
    let parts = rawJson.split(#text marker);
    var result : ?Text = null;
    var isFirst = true;
    for (part in parts) {
      if (isFirst) {
        isFirst := false;
      } else if (result == null) {
        // Find the first unescaped closing quote
        let chars = part.toArray();
        let n = chars.size();
        var endIdx = n; // default: take whole segment
        var i = 0;
        var found = false;
        while (i < n and not found) {
          if (chars[i] == '\u{22}') {
            endIdx := i;
            found := true;
          };
          i += 1;
        };
        let slice = Array.tabulate(endIdx, func(j) { chars[j] });
        let raw = Text.fromArray(slice);
        // Normalise escape sequences to spaces
        let unescaped = raw
          .replace(#text "\\r\\n", " ")
          .replace(#text "\\r", " ")
          .replace(#text "\\n", " ")
          .replace(#text "\\t", " ");
        result := ?unescaped;
      };
    };
    result
  };

  /// Find the value that follows a field marker in the OCR text.
  /// Splits by the lower-cased marker, then returns the first non-empty colon-stripped token.
  func findAfterLabel(text : Text, marker : Text) : ?Text {
    let lowerText = text.toLower();
    let lowerMarker = marker.toLower();
    let parts = lowerText.split(#text lowerMarker);
    var result : ?Text = null;
    var isFirst = true;
    for (part in parts) {
      if (isFirst) {
        isFirst := false;
      } else if (result == null) {
        // Strip leading colon / space then take first space-separated token
        let stripped = part.trimStart(#text " ").trimStart(#text ":").trimStart(#text " ");
        let tokens = stripped.split(#text " ");
        for (tok in tokens) {
          let t = tok.trim(#text " ");
          if (result == null and t.size() > 1) {
            result := ?t;
          };
        };
      };
    };
    result
  };

  /// Try multiple field marker aliases, return the first match.
  func findAny(text : Text, markers : [Text]) : ?Text {
    var result : ?Text = null;
    for (mrk in markers.values()) {
      if (result == null) {
        result := findAfterLabel(text, mrk);
      };
    };
    result
  };

  /// Parse OCR plain text into ExtractedFields based on common French identity document labels.
  public func parseFieldsFromText(ocrText : Text, _documentType : Types.DocumentType) : Types.ExtractedFields {
    let t = ocrText;
    {
      nom             = findAny(t, ["nom:", "nom ", "surname"]);
      prenom          = findAny(t, ["prenom:", "prenom ", "prénom:", "prénom ", "given name"]);
      numero_document = findAny(t, ["numero:", "numéro:", "n°:", "document no", "no:", "id no"]);
      date_naissance  = findAny(t, ["naissance:", "né(e) le", "ne le", "date of birth", "birth"]);
      date_delivrance = findAny(t, ["delivrance:", "délivrance:", "délivrée le", "issue date"]);
      date_expiration = findAny(t, ["expiration:", "expire:", "expiry:", "valid until", "date d'expiration"]);
      nationalite     = findAny(t, ["nationalite:", "nationalité:", "nationality"]);
      lieu_naissance  = findAny(t, ["lieu de naissance", "lieu:", "place of birth"]);
      adresse         = findAny(t, ["adresse:", "address:", "domicile"]);
      sexe            = findAny(t, ["sexe:", "sex:", "genre:"]);
    }
  };

  /// Parse raw OCR JSON response into a ScanResult.
  public func parseOcrResponse(
    rawJson : Text,
    documentType : Types.DocumentType,
  ) : Types.ScanResult {
    if (rawJson.size() == 0) {
      return #err (#network_error "Réponse OCR vide");
    };
    if (rawJson.contains(#text "\"IsErroredOnProcessing\":true")) {
      return #err (#ocr_failure "Erreur de traitement OCR");
    };
    let parsedText = switch (extractParsedText(rawJson)) {
      case null  { rawJson };
      case (?t)  { t };
    };
    let fields = parseFieldsFromText(parsedText, documentType);
    #ok {
      principal_key  = "";   // filled by the mixin after parsing
      document_type  = documentType;
      extracted      = fields;
      raw_json       = rawJson;
      scanned_at     = 0;    // filled by the mixin after parsing
    }
  };

  /// Store a scan session for a principal.
  public func storeSession(
    sessions : SessionStore,
    principalKey : Text,
    session : Types.ScanSession,
  ) {
    sessions.add(principalKey, session);
  };

  /// Retrieve the latest scan session for a principal.
  public func getSession(
    sessions : SessionStore,
    principalKey : Text,
  ) : ?Types.ScanSession {
    sessions.get(principalKey)
  };

  /// Clear the scan session for a principal.
  public func clearSession(
    sessions : SessionStore,
    principalKey : Text,
  ) {
    sessions.remove(principalKey);
  };
};
