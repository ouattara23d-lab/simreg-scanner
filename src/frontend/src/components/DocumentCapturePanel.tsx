import { Button } from "@/components/ui/button";
import type { CameraError } from "@/hooks/useCameraCapture";
import { useCameraCapture } from "@/hooks/useCameraCapture";
import {
  AlertCircle,
  Camera,
  CameraOff,
  ImagePlus,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface DocumentCapturePanelProps {
  onImageCaptured: (imageData: string) => void;
  isProcessing: boolean;
}

function CameraErrorMessage({ error }: { error: CameraError }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <CameraOff className="w-5 h-5 text-destructive" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground font-body">
          Accès caméra impossible
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{error.message}</p>
      </div>
    </div>
  );
}

export function DocumentCapturePanel({
  onImageCaptured,
  isProcessing,
}: DocumentCapturePanelProps) {
  const {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    error,
    startCamera,
    stopCamera,
    capturePhoto,
    retry,
  } = useCameraCapture();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera when processing starts
  useEffect(() => {
    if (isProcessing && isActive) {
      stopCamera();
    }
  }, [isProcessing, isActive, stopCamera]);

  const handleCapture = useCallback(async () => {
    const data = await capturePhoto();
    if (data) {
      await stopCamera();
      onImageCaptured(data);
    }
  }, [capturePhoto, stopCamera, onImageCaptured]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === "string") {
          onImageCaptured(result);
        }
      };
      reader.readAsDataURL(file);
      // reset input
      e.target.value = "";
    },
    [onImageCaptured],
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Camera viewport */}
      <div
        className="relative w-full rounded-xl overflow-hidden bg-foreground/90"
        style={{ aspectRatio: "16/9" }}
        data-ocid="capture.camera_viewport"
      >
        {/* Video stream */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Scan viewfinder overlay — shown when camera is active */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
            <div
              className="w-full h-full scan-viewfinder"
              style={{ maxWidth: "85%", maxHeight: "80%" }}
            />
          </div>
        )}

        {/* Idle / error placeholder */}
        {!isActive && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground/90">
            {error ? (
              <CameraErrorMessage error={error} />
            ) : (
              <>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.84 0.23 80)" }}
                >
                  <Camera
                    className="w-7 h-7"
                    style={{ color: "oklch(0.14 0.02 50)" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  Appuyez sur{" "}
                  <strong className="text-foreground">Ouvrir la caméra</strong>
                </p>
              </>
            )}
          </div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/90">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-transparent border-t-current animate-spin"
                style={{ borderTopColor: "oklch(0.84 0.23 80)" }}
              />
              <p className="text-xs text-muted-foreground font-body">
                Initialisation…
              </p>
            </div>
          </div>
        )}

        {/* Corner X to stop camera */}
        {isActive && (
          <button
            type="button"
            data-ocid="capture.stop_camera_button"
            onClick={stopCamera}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/70 flex items-center justify-center text-background hover:bg-foreground/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Arrêter la caméra"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Hidden canvas for snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {!isActive && !isLoading && (
          <>
            {error ? (
              <button
                type="button"
                data-ocid="capture.retry_camera_button"
                onClick={retry}
                className="btn-accent flex items-center gap-2 flex-1"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
            ) : (
              <button
                type="button"
                data-ocid="capture.open_camera_button"
                onClick={startCamera}
                className="btn-accent flex items-center gap-2 flex-1"
              >
                <Camera className="w-4 h-4" />
                Ouvrir la caméra
              </button>
            )}

            <Button
              variant="outline"
              data-ocid="capture.upload_button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 flex-shrink-0 h-9"
            >
              <ImagePlus className="w-4 h-4" />
              <span className="hidden sm:inline">Importer</span>
            </Button>
          </>
        )}

        {isActive && (
          <>
            <button
              type="button"
              data-ocid="capture.take_photo_button"
              onClick={handleCapture}
              disabled={isProcessing}
              className="btn-accent flex items-center gap-2 flex-1"
            >
              <Camera className="w-4 h-4" />
              Capturer l'image
            </button>

            <Button
              variant="outline"
              data-ocid="capture.cancel_camera_button"
              onClick={stopCamera}
              className="flex items-center gap-2 h-9"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Annuler</span>
            </Button>
          </>
        )}
      </div>

      {/* Tip */}
      {isActive && (
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/50 animate-slide-in-up">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground font-body leading-snug">
            Placez le document dans le cadre, bien éclairé et lisible.
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        tabIndex={-1}
        onChange={handleFileUpload}
      />
    </div>
  );
}
