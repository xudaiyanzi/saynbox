import React from "react";

interface Props {
  onImageData: (data: ImageData) => void;
}

export default function ImageLoader({ onImageData }: Readonly<Props>) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // allow drawing to canvas
    const url = URL.createObjectURL(file);

    img.onload = () => {
      console.log("✅ Image loaded:", img.width, "x", img.height);
      const canvas = document.createElement("canvas");
      // limit canvas size to avoid huge images
      const maxWidth = 400;
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log("📦 Pixels extracted:", data.width, "x", data.height);
      onImageData(data);
      URL.revokeObjectURL(url); // cleanup
    };

    img.onerror = (err) => {
      console.error("❌ Image load error:", err);
    };

    img.src = url;
  };

  return (
    <div style={{ margin: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFile} />
    </div>
  );
}
