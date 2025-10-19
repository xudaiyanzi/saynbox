import { useEffect, useRef } from "react";

export default function useSpeech(onCommand: (cmd: string) => void) {
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.lang = "en-US";
    rec.interimResults = false;

    rec.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      console.log("🎤 Heard:", transcript);
      onCommand(transcript);
    };

    rec.onerror = (e: any) => {
      console.error("Speech error:", e.error);
    };

    recognitionRef.current = rec;
  }, [onCommand]);

  // Public API to start listening manually
  const startListening = () => {
    try {
      recognitionRef.current?.start();
      console.log("🎧 Listening started");
    } catch (err) {
      console.warn("Speech start error:", err);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    console.log("🛑 Listening stopped");
  };

  return { startListening, stopListening };
}
