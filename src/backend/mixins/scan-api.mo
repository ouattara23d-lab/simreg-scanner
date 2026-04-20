import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/scan";
import ScanLib "../lib/scan";

mixin (sessions : ScanLib.SessionStore) {
  /// Transform callback required by the IC HTTP outcalls subsystem.
  /// Strips non-deterministic headers so all replicas agree on the response.
  public query func transform(
    input : OutCall.TransformationInput
  ) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

  /// Scan a document: POST base64 image to OCR.space, parse result, store session.
  /// Returns structured ExtractedFields wrapped in a ScanSession on success.
  public shared ({ caller }) func scanDocument(
    request : Types.ScanRequest
  ) : async Types.ScanResult {
    let body = ScanLib.buildOcrRequestBody(request.image_base64, request.document_type);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/x-www-form-urlencoded" },
    ];
    let rawJson = try {
      await OutCall.httpPostRequest(ScanLib.OCR_API_URL, headers, body, transform)
    } catch (e) {
      return #err (#network_error "Impossible de joindre l'API OCR");
    };
    let result = ScanLib.parseOcrResponse(rawJson, request.document_type);
    switch (result) {
      case (#err e) { #err e };
      case (#ok partialSession) {
        let principalKey = caller.toText();
        let session : Types.ScanSession = {
          partialSession with
          principal_key = principalKey;
          scanned_at    = Time.now();
        };
        ScanLib.storeSession(sessions, principalKey, session);
        #ok session
      };
    }
  };

  /// Retrieve the most recent scan session for the caller.
  public shared query ({ caller }) func getLastScan() : async ?Types.ScanSession {
    ScanLib.getSession(sessions, caller.toText())
  };

  /// Delete the caller's stored scan session.
  public shared ({ caller }) func clearLastScan() : async () {
    ScanLib.clearSession(sessions, caller.toText())
  };
};
