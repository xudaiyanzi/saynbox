import { useCallback, useState } from "react";
import useSpeech from "./hooks/useSpeech";
import ImageLoader from "./components/ImageLoader";
import CanvasRenderer from "./components/CanvasRenderer";

export default function App() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [speed, setSpeed] = useState(1);
  const [running, setRunning] = useState(true);
  const [mode, setMode] = useState<"normal" | "rain">("normal");
  const [bounceStrength, setBounceStrength] = useState(0.4);
  const [resetSignal, setResetSignal] = useState(0);

  const handleCommand = useCallback((cmd: string) => {
    console.log("🎧 Heard:", cmd);

    if (cmd.includes("faster")) setSpeed((s) => Math.min(s + 0.5, 5));
    else if (cmd.includes("slow")) setSpeed((s) => Math.max(s - 0.5, 0.2));
    else if (cmd.includes("stop")) setRunning(false);
    else if (cmd.includes("go") || cmd.includes("run")) setRunning(true);
    else if (cmd.includes("clear") || cmd.includes("reset")) setResetSignal((r) => r + 1);
    else if (cmd.includes("bounce")) {
      setBounceStrength((b) => (b < 0.8 ? 0.9 : 0.4)); // toggle soft/strong bounce
      console.log("🪩 Bounce toggled");
    } else if (cmd.includes("jump")) {
      // give upward impulse
      setSpeed((s) => s + 1);
      setTimeout(() => setSpeed((s) => Math.max(s - 1, 0.5)), 1000);
      console.log("🦘 Jump!");
    } else if (cmd.includes("rain")) {
      setMode((m) => (m === "rain" ? "normal" : "rain"));
      console.log("🌧️ Rain mode toggled");
    }
  }, []);

  const { startListening, stopListening } = useSpeech(handleCommand);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h1>🎤 SaynBox v2.0</h1>
      <p>
        Say <b>faster</b>, <b>slower</b>, <b>stop</b>, <b>go</b>, <b>jump</b>, <b>rain</b>,{" "}
        <b>bounce</b>, or <b>reset</b>.
      </p>

      <div style={{ marginBottom: 10 }}>
        <button onClick={startListening}>🎧 Start Listening</button>{" "}
        <button onClick={stopListening}>🛑 Stop Listening</button>
      </div>

      <ImageLoader onImageData={setImageData} />
      <CanvasRenderer
        imageData={imageData}
        speed={speed}
        running={running}
        mode={mode}
        bounceStrength={bounceStrength}
        resetSignal={resetSignal}
      />

      <p style={{ color: "#aaa" }}>
        Mode: {mode} | Speed: {speed.toFixed(1)} | Running:{" "}
        {running ? "Yes" : "No"}
      </p>
    </div>
  );
}
