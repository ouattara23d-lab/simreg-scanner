import { DocumentCapturePanel } from "@/components/DocumentCapturePanel";
import { DocumentTypeSelector } from "@/components/DocumentTypeSelector";
import { ExtractionPanel } from "@/components/ExtractionPanel";
import { useDocumentScan } from "@/hooks/useDocumentScan";
import type { UseScanSessionReturn } from "@/hooks/useScanSession";
import { useScanSession } from "@/hooks/useScanSession";
import { CheckCircle2, FileSearch, ScanLine, ShieldCheck } from "lucide-react";

const STEPS = [
  { label: "Choisir document", icon: FileSearch },
  { label: "Scanner", icon: ScanLine },
  { label: "Vérifier et corriger", icon: ShieldCheck },
];

function stepIndexFromSession(step: string): number {
  if (step === "idle") return 0;
  if (step === "camera" || step === "processing") return 1;
  return 2; // extracted | validated
}

interface StepIndicatorProps {
  currentIndex: number;
}

function StepIndicator({ currentIndex }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0 w-full" aria-label="Étapes">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        const Icon = step.icon;
        return (
          <div
            key={step.label}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-smooth",
                  isDone
                    ? "bg-foreground text-background"
                    : isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>
              <span
                className={[
                  "text-[10px] font-body whitespace-nowrap leading-tight text-center",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {/* connector */}
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "flex-1 h-[2px] mx-1.5 mb-3 rounded-full transition-smooth",
                  i < currentIndex ? "bg-foreground/40" : "bg-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ScanPageProps {
  session?: UseScanSessionReturn;
}

function ScanPageInner({ session }: { session: UseScanSessionReturn }) {
  const {
    isScanning,
    error: scanError,
    scanDocument,
    clearError,
  } = useDocumentScan();

  const stepIndex = stepIndexFromSession(session.step);

  const handleImageCaptured = async (imageData: string) => {
    session.setCapturedImage(imageData);
    const result = await scanDocument(imageData, session.documentType);
    if (result) {
      session.setScanResult(result);
    }
  };

  const handleRetry = () => {
    clearError();
    session.goToCamera();
    session.reset();
  };

  const isProcessing = session.step === "processing" || isScanning;
  const errorMessage = scanError?.message ?? null;

  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4 h-full overflow-y-auto">
      {/* Step indicator */}
      <div
        className="bg-card rounded-xl border border-border px-3 pt-3 pb-2 shadow-sm"
        data-ocid="scan.step_indicator"
      >
        <StepIndicator currentIndex={stepIndex} />
      </div>

      {/* Document type selector */}
      <div className="bg-card rounded-xl border border-border px-4 py-3 shadow-sm">
        <DocumentTypeSelector
          value={session.documentType}
          onChange={session.setDocumentType}
        />
      </div>

      {/* Image preview (after capture) */}
      {session.capturedImage && (
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm animate-slide-in-up">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground font-body">
              Document capturé
            </p>
          </div>
          <div className="relative">
            <img
              src={session.capturedImage}
              alt="Document capturé"
              className="w-full object-contain max-h-48"
              data-ocid="scan.captured_image"
            />
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/60 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full border-2 border-transparent border-t-accent animate-spin" />
                <p className="text-sm font-semibold text-background font-body animate-scan-pulse">
                  Analyse du document…
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Camera capture — shown when no image yet */}
      {!session.capturedImage && (
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground font-body mb-3 uppercase tracking-wide">
            Scanner le document
          </p>
          <DocumentCapturePanel
            onImageCaptured={handleImageCaptured}
            isProcessing={isProcessing}
          />
        </div>
      )}

      {/* Retake button if image already captured */}
      {session.capturedImage && !isProcessing && (
        <button
          type="button"
          data-ocid="scan.retake_button"
          onClick={handleRetry}
          className="text-xs text-muted-foreground underline hover:text-foreground transition-smooth self-start font-body"
        >
          ↩ Recommencer le scan
        </button>
      )}

      {/* Extraction panel */}
      <ExtractionPanel
        fields={session.editedFields}
        isLoading={isProcessing}
        isValidated={session.isValidated}
        error={errorMessage}
        onFieldChange={session.updateField}
        onValidate={session.validate}
        onReset={session.reset}
        onRetry={scanError ? handleRetry : undefined}
      />
    </div>
  );
}

function ScanPageWithOwnSession() {
  const session = useScanSession();
  return <ScanPageInner session={session} />;
}

export function ScanPage({ session: externalSession }: ScanPageProps) {
  if (externalSession) {
    return <ScanPageInner session={externalSession} />;
  }
  return <ScanPageWithOwnSession />;
}
