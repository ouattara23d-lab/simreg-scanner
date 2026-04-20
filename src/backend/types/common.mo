module {
  public type Timestamp = Int;

  public type DocumentType = {
    #cni;
    #passport;
    #driver_license;
    #residence_permit;
    #other;
  };

  public type OcrError = {
    #ocr_failure : Text;
    #unsupported_document;
    #network_error : Text;
    #invalid_image;
  };
};
