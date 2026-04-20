import { useCallback, useRef, useState } from "react";

export interface CameraError {
  type: "permission" | "not-supported" | "not-found" | "unknown" | "timeout";
  message: string;
}

interface UseCameraCaptureReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  isLoading: boolean;
  isSupported: boolean | null;
  error: CameraError | null;
  startCamera: () => Promise<boolean>;
  stopCamera: () => Promise<void>;
  capturePhoto: () => Promise<string | null>;
  retry: () => Promise<boolean>;
}

export function useCameraCapture(): UseCameraCaptureReturn {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const streamRef = useRef<MediaStream | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CameraError | null>(null);
  const [isSupported] = useState<boolean | null>(
    () =>
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia,
  );

  const startCamera = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError({
        type: "not-supported",
        message: "La caméra n'est pas supportée dans ce navigateur.",
      });
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      setIsLoading(false);
      const domErr = err as { name?: string };
      if (
        domErr?.name === "NotAllowedError" ||
        domErr?.name === "PermissionDeniedError"
      ) {
        setError({
          type: "permission",
          message:
            "Permission caméra refusée. Veuillez autoriser l'accès à la caméra.",
        });
      } else if (domErr?.name === "NotFoundError") {
        setError({
          type: "not-found",
          message: "Aucune caméra détectée sur cet appareil.",
        });
      } else {
        setError({
          type: "unknown",
          message: "Impossible d'accéder à la caméra.",
        });
      }
      return false;
    }
  }, [isSupported]);

  const stopCamera = useCallback(async (): Promise<void> => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const capturePhoto = useCallback(async (): Promise<string | null> => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  }, [isActive]);

  const retry = useCallback(async (): Promise<boolean> => {
    setError(null);
    return startCamera();
  }, [startCamera]);

  return {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    isSupported,
    error,
    startCamera,
    stopCamera,
    capturePhoto,
    retry,
  };
}
