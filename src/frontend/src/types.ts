export type DocumentType =
  | "cni"
  | "passport"
  | "driver_license"
  | "residence_permit"
  | "other";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  cni: "Carte Nationale d'Identité (CNI)",
  passport: "Passeport",
  driver_license: "Permis de conduire",
  residence_permit: "Carte de séjour",
  other: "Autre document",
};

export interface ExtractedFields {
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  documentNumber: string;
  gender: string;
  expiryDate: string;
  nationality: string;
  placeOfBirth: string;
}

export interface ScanRequest {
  imageData: string; // base64
  documentType: DocumentType;
}

export interface ScanResult {
  success: boolean;
  fields: ExtractedFields | null;
  confidence: number;
  errorMessage: string | null;
  documentType: DocumentType;
}

export interface ScanSession {
  id: string;
  timestamp: number;
  documentType: DocumentType;
  result: ScanResult;
  validated: boolean;
}

export interface OcrError {
  code:
    | "CAPTURE_FAILED"
    | "OCR_FAILED"
    | "LOW_CONFIDENCE"
    | "NETWORK_ERROR"
    | "UNSUPPORTED_DOC";
  message: string;
}

export type ScanStep =
  | "idle"
  | "camera"
  | "processing"
  | "extracted"
  | "validated";
