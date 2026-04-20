import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { ExtractedFields } from "@/types";
import { AlertCircle, CheckCircle2, RefreshCw, RotateCcw } from "lucide-react";

interface ExtractionPanelProps {
  fields: ExtractedFields | null;
  isLoading: boolean;
  isValidated: boolean;
  error: string | null;
  onFieldChange: <K extends keyof ExtractedFields>(
    key: K,
    value: ExtractedFields[K],
  ) => void;
  onValidate: () => void;
  onReset: () => void;
  onRetry?: () => void;
}

const FIELD_LABELS: Record<keyof ExtractedFields, string> = {
  lastName: "Nom de famille",
  firstName: "Prénoms",
  dateOfBirth: "Date de naissance",
  documentNumber: "Numéro de document",
  gender: "Sexe",
  expiryDate: "Date d'expiration",
  nationality: "Nationalité",
  placeOfBirth: "Lieu de naissance",
};

const FIELD_PLACEHOLDERS: Record<keyof ExtractedFields, string> = {
  lastName: "ex : KOUASSI",
  firstName: "ex : Aminata",
  dateOfBirth: "jj/mm/aaaa",
  documentNumber: "ex : R0976",
  gender: "",
  expiryDate: "jj/mm/aaaa",
  nationality: "ex : Ivoirienne",
  placeOfBirth: "ex : Abidjan",
};

function FieldSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="h-3.5 w-24 rounded" />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
}

export function ExtractionPanel({
  fields,
  isLoading,
  isValidated,
  error,
  onFieldChange,
  onValidate,
  onReset,
  onRetry,
}: ExtractionPanelProps) {
  const fieldKeys = Object.keys(FIELD_LABELS) as (keyof ExtractedFields)[];

  return (
    <div
      className="flex flex-col gap-4 bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5 animate-slide-in-up"
      data-ocid="extraction.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display font-semibold text-base text-foreground">
          Données extraites
        </h2>
        {isValidated && (
          <span className="badge-success" data-ocid="extraction.success_state">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Données validées
          </span>
        )}
        {isLoading && (
          <span
            className="badge-warning animate-scan-pulse"
            data-ocid="extraction.loading_state"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            Analyse en cours…
          </span>
        )}
      </div>

      {/* Error state */}
      {error && !isLoading && (
        <div
          className="flex items-start gap-3 p-3 rounded-lg bg-destructive/8 border border-destructive/20"
          data-ocid="extraction.error_state"
        >
          <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
          {onRetry && (
            <button
              type="button"
              data-ocid="extraction.retry_button"
              onClick={onRetry}
              className="text-xs text-destructive underline hover:no-underline font-body shrink-0"
            >
              Réessayer
            </button>
          )}
        </div>
      )}

      {/* Skeleton loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fieldKeys.map((key) => (
            <FieldSkeleton key={key} />
          ))}
        </div>
      )}

      {/* Fields form */}
      {!isLoading && fields && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fieldKeys.map((key, idx) => {
            if (key === "gender") {
              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`field-${key}`}
                    className="text-xs font-medium text-foreground/80 font-body"
                  >
                    {FIELD_LABELS[key]}
                  </Label>
                  <Select
                    value={fields[key]}
                    onValueChange={(v) => onFieldChange(key, v)}
                  >
                    <SelectTrigger
                      id={`field-${key}`}
                      data-ocid={`extraction.field.${idx + 1}.select`}
                      className="h-9 text-sm border-input bg-background"
                    >
                      <SelectValue placeholder="Sélectionner…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculin</SelectItem>
                      <SelectItem value="F">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            }
            return (
              <div key={key} className="flex flex-col gap-1.5">
                <Label
                  htmlFor={`field-${key}`}
                  className="text-xs font-medium text-foreground/80 font-body"
                >
                  {FIELD_LABELS[key]}
                </Label>
                <Input
                  id={`field-${key}`}
                  data-ocid={`extraction.field.${idx + 1}.input`}
                  value={fields[key]}
                  onChange={(e) => onFieldChange(key, e.target.value)}
                  placeholder={FIELD_PLACEHOLDERS[key]}
                  className="h-9 text-sm border-input bg-background"
                  disabled={isValidated}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state — no scan yet */}
      {!isLoading && !fields && !error && (
        <div
          className="flex flex-col items-center justify-center py-8 text-center gap-2"
          data-ocid="extraction.empty_state"
        >
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Aucune donnée extraite pour l'instant.
          </p>
          <p className="text-xs text-muted-foreground/70 font-body">
            Scannez un document pour voir les informations ici.
          </p>
        </div>
      )}

      {/* Action buttons */}
      {!isLoading && (fields || error) && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
          {!isValidated && fields && (
            <button
              type="button"
              data-ocid="extraction.validate_button"
              onClick={onValidate}
              className="btn-accent flex items-center gap-2 flex-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              Valider les données
            </button>
          )}
          <Button
            variant="outline"
            data-ocid="extraction.reset_button"
            onClick={onReset}
            className="flex items-center gap-2 h-9 flex-shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Annuler</span>
          </Button>
        </div>
      )}
    </div>
  );
}
