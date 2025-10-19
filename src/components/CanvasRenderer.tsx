import { useEffect, useRef } from "react";

interface Props {
  imageData?: ImageData | null;
  speed: number;
  running: boolean;
  mode?:string;
  bounceStrength?: number;
  resetSignal?: number;
}

export default function CanvasRenderer({ imageData, speed, running }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yOffsetRef = useRef(0); // image vertical offset
  const speedRef = useRef(speed);
  const runningRef = useRef(running);
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  // keep latest speed and running values
  useEffect(() => {
    speedRef.current = speed;
    runningRef.current = running;
  }, [speed, running]);

  // convert imageData into an offscreen canvas
  useEffect(() => {
    if (!imageData) return;
    const offCanvas = document.createElement("canvas");
    offCanvas.width = imageData.width;
    offCanvas.height = imageData.height;
    const ctx = offCanvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(imageData, 0, 0);
    imageRef.current = offCanvas;
    yOffsetRef.current = 0;
  }, [imageData]);

  // main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (imageRef.current) {
        const img = imageRef.current;
        const imgWidth = img.width;
        const imgHeight = img.height;

        if (runningRef.current) {
          yOffsetRef.current += speedRef.current; // move down
        }

        // reset to top once fully out of view
        if (yOffsetRef.current > canvas.height) {
          yOffsetRef.current = -imgHeight;
        }

        const x = (canvas.width - imgWidth) / 2;
        const y = yOffsetRef.current;
        ctx.drawImage(img, x, y);
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{
        border: "2px solid #444",
        borderRadius: "8px",
        background: "#000",
        display: "block",
        margin: "20px auto",
      }}
    />
  );
}
