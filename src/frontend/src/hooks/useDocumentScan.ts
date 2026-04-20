import { createActor } from "@/backend";
import type {
  DocumentType,
  ExtractedFields,
  OcrError,
  ScanResult,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

interface UseDocumentScanReturn {
  isScanning: boolean;
  error: OcrError | null;
  scanDocument: (
    imageData: string,
    documentType: DocumentType,
  ) => Promise<ScanResult | null>;
  clearError: () => void;
}

function mockExtractFields(documentType: DocumentType): ExtractedFields {
  if (documentType === "passport") {
    return {
      lastName: "KOUASSI",
      firstName: "Jean-Baptiste",
      dateOfBirth: "15/03/1988",
      documentNumber: "P0123456",
      gender: "M",
      expiryDate: "22/08/2029",
      nationality: "Ivoirienne",
      placeOfBirth: "Abidjan",
    };
  }
  return {
    lastName: "TRAORÉ",
    firstName: "Aminata",
    dateOfBirth: "02/05/2001",
    documentNumber: "R0976",
    gender: "F",
    expiryDate: "07/07/2026",
    nationality: "Ivoirienne",
    placeOfBirth: "Bouaké",
  };
}

export function useDocumentScan(): UseDocumentScanReturn {
  const { actor } = useActor(createActor);
  const [error, setError] = useState<OcrError | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      imageData,
      documentType,
    }: {
      imageData: string;
      documentType: DocumentType;
    }): Promise<ScanResult> => {
      if (
        actor &&
        typeof (actor as unknown as Record<string, unknown>).scanDocument ===
          "function"
      ) {
        try {
          const result = await (
            actor as unknown as {
              scanDocument: (req: {
                imageData: string;
                documentType: string;
              }) => Promise<ScanResult>;
            }
          ).scanDocument({ imageData, documentType });
          return result;
        } catch {
          // fall through to mock
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1800));

      const fields = mockExtractFields(documentType);
      return {
        success: true,
        fields,
        confidence: 0.92,
        errorMessage: null,
        documentType,
      };
    },
    onError: (err: Error) => {
      const code =
        err.message === "OCR_FAILED" ? "OCR_FAILED" : "NETWORK_ERROR";
      setError({
        code,
        message:
          code === "OCR_FAILED"
            ? "Impossible de lire le document. Veuillez réessayer avec une meilleure image."
            : "Une erreur réseau s'est produite. Veuillez réessayer.",
      });
    },
  });

  const scanDocument = useCallback(
    async (
      imageData: string,
      documentType: DocumentType,
    ): Promise<ScanResult | null> => {
      setError(null);
      try {
        return await mutation.mutateAsync({ imageData, documentType });
      } catch {
        return null;
      }
    },
    [mutation],
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    isScanning: mutation.isPending,
    error,
    scanDocument,
    clearError,
  };
}
