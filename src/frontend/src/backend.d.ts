import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScanSession {
    document_type: DocumentType;
    extracted: ExtractedFields;
    principal_key: string;
    raw_json: string;
    scanned_at: Timestamp;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type ScanResult = {
    __kind__: "ok";
    ok: ScanSession;
} | {
    __kind__: "err";
    err: OcrError;
};
export interface ScanRequest {
    document_type: DocumentType;
    image_base64: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type OcrError = {
    __kind__: "network_error";
    network_error: string;
} | {
    __kind__: "ocr_failure";
    ocr_failure: string;
} | {
    __kind__: "unsupported_document";
    unsupported_document: null;
} | {
    __kind__: "invalid_image";
    invalid_image: null;
};
export interface ExtractedFields {
    nom?: string;
    numero_document?: string;
    date_naissance?: string;
    sexe?: string;
    nationalite?: string;
    adresse?: string;
    prenom?: string;
    lieu_naissance?: string;
    date_expiration?: string;
    date_delivrance?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export enum DocumentType {
    cni = "cni",
    other = "other",
    passport = "passport",
    driver_license = "driver_license",
    residence_permit = "residence_permit"
}
export interface backendInterface {
    clearLastScan(): Promise<void>;
    getLastScan(): Promise<ScanSession | null>;
    scanDocument(request: ScanRequest): Promise<ScanResult>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
