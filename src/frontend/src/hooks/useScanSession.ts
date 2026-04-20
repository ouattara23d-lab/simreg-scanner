import type {
  DocumentType,
  ExtractedFields,
  ScanResult,
  ScanStep,
} from "@/types";
import { useCallback, useState } from "react";

export interface UseScanSessionReturn {
  step: ScanStep;
  documentType: DocumentType;
  capturedImage: string | null;
  scanResult: ScanResult | null;
  editedFields: ExtractedFields | null;
  isValidated: boolean;

  setDocumentType: (type: DocumentType) => void;
  setCapturedImage: (data: string) => void;
  setScanResult: (result: ScanResult) => void;
  updateField: <K extends keyof ExtractedFields>(
    key: K,
    value: ExtractedFields[K],
  ) => void;
  validate: () => void;
  reset: () => void;
  goToCamera: () => void;
  goToIdle: () => void;
}

const EMPTY_FIELDS: ExtractedFields = {
  lastName: "",
  firstName: "",
  dateOfBirth: "",
  documentNumber: "",
  gender: "",
  expiryDate: "",
  nationality: "",
  placeOfBirth: "",
};

export function useScanSession(): UseScanSessionReturn {
  const [step, setStep] = useState<ScanStep>("idle");
  const [documentType, setDocumentType] = useState<DocumentType>("cni");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResultState] = useState<ScanResult | null>(null);
  const [editedFields, setEditedFields] = useState<ExtractedFields | null>(
    null,
  );
  const [isValidated, setIsValidated] = useState(false);

  const handleSetCapturedImage = useCallback((data: string) => {
    setCapturedImage(data);
    setStep("processing");
  }, []);

  const handleSetScanResult = useCallback((result: ScanResult) => {
    setScanResultState(result);
    setEditedFields(result.fields ?? { ...EMPTY_FIELDS });
    setStep("extracted");
    setIsValidated(false);
  }, []);

  const updateField = useCallback(
    <K extends keyof ExtractedFields>(key: K, value: ExtractedFields[K]) => {
      setEditedFields((prev) =>
        prev ? { ...prev, [key]: value } : { ...EMPTY_FIELDS, [key]: value },
      );
    },
    [],
  );

  const validate = useCallback(() => {
    setIsValidated(true);
    setStep("validated");
  }, []);

  const reset = useCallback(() => {
    setStep("idle");
    setCapturedImage(null);
    setScanResultState(null);
    setEditedFields(null);
    setIsValidated(false);
  }, []);

  const goToCamera = useCallback(() => setStep("camera"), []);
  const goToIdle = useCallback(() => setStep("idle"), []);

  return {
    step,
    documentType,
    capturedImage,
    scanResult,
    editedFields,
    isValidated,
    setDocumentType,
    setCapturedImage: handleSetCapturedImage,
    setScanResult: handleSetScanResult,
    updateField,
    validate,
    reset,
    goToCamera,
    goToIdle,
  };
}
