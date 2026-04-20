import type { backendInterface } from "../backend";
import { DocumentType } from "../backend";

export const mockBackend: backendInterface = {
  clearLastScan: async () => undefined,
  getLastScan: async () => ({
    document_type: DocumentType.cni,
    extracted: {
      nom: "KOUASSI",
      prenom: "Aya Marie",
      date_naissance: "15/03/1990",
      lieu_naissance: "Abidjan",
      sexe: "F",
      nationalite: "Ivoirienne",
      numero_document: "CI-2019-0123456",
      date_delivrance: "10/01/2019",
      date_expiration: "09/01/2029",
      adresse: "Cocody, Abidjan",
    },
    principal_key: "mock-principal-001",
    raw_json: "{}",
    scanned_at: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  scanDocument: async () => ({
    __kind__: "ok",
    ok: {
      document_type: DocumentType.cni,
      extracted: {
        nom: "KOUASSI",
        prenom: "Aya Marie",
        date_naissance: "15/03/1990",
        lieu_naissance: "Abidjan",
        sexe: "F",
        nationalite: "Ivoirienne",
        numero_document: "CI-2019-0123456",
        date_delivrance: "10/01/2019",
        date_expiration: "09/01/2029",
        adresse: "Cocody, Abidjan",
      },
      principal_key: "mock-principal-001",
      raw_json: "{}",
      scanned_at: BigInt(Date.now()) * BigInt(1_000_000),
    },
  }),
  transform: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
};
