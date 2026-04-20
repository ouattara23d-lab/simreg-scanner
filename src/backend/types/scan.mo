import CommonTypes "common";

module {
  public type DocumentType = CommonTypes.DocumentType;
  public type OcrError = CommonTypes.OcrError;
  public type Timestamp = CommonTypes.Timestamp;

  /// Structured fields extracted from an identity document.
  public type ExtractedFields = {
    nom : ?Text;
    prenom : ?Text;
    numero_document : ?Text;
    date_naissance : ?Text;
    date_delivrance : ?Text;
    date_expiration : ?Text;
    nationalite : ?Text;
    lieu_naissance : ?Text;
    adresse : ?Text;
    sexe : ?Text;
  };

  /// A session scan result keyed by principal text.
  public type ScanSession = {
    principal_key : Text;
    document_type : DocumentType;
    extracted : ExtractedFields;
    raw_json : Text;
    scanned_at : Timestamp;
  };

  public type ScanRequest = {
    image_base64 : Text;
    document_type : DocumentType;
  };

  public type ScanResult = {
    #ok : ScanSession;
    #err : OcrError;
  };
};
