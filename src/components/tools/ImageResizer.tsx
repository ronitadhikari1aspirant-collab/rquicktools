import { Download, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorText } from "./ui";

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_DIM = 8000;

export default function ImageResizer() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState("");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp">("image/jpeg");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");

  useEffect(() => () => { if (out) URL.revokeObjectURL(out); }, [out]);

  const load = (file?: File) => {
    setOut("");
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image file (JPG, PNG, WebP...).");
    if (file.size > MAX_BYTES) return setError("Image is too large — maximum 20 MB.");
    const url = URL.createObjectURL(file);
    const el = new Image();
    el.onload = () => {
      setImg(el);
      setName(file.name.replace(/\.[^.]+$/, ""));
      setW(String(el.naturalWidth));
      setH(String(el.naturalHeight));
      setError("");
    };
    el.onerror = () => setError("That image couldn't be read.");
    el.src = url;
  };

  const ratio = img ? img.naturalHeight / img.naturalWidth : 1;
  const onW = (v: string) => { setW(v); if (lock && img && +v > 0) setH(String(Math.round(+v * ratio))); };
  const onH = (v: string) => { setH(v); if (lock && img && +v > 0) setW(String(Math.round(+v / ratio))); };

  const resize = () => {
    if (!img) return setError("Upload an image first.");
    const width = Math.round(Number(w)), height = Math.round(Number(h));
    if (!(width > 0 && height > 0)) return setError("Width and height must be positive numbers.");
    if (width > MAX_DIM || height > MAX_DIM) return setError(`Maximum size is ${MAX_DIM}px per side.`);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return setError("Your browser can't resize images.");
    if (format === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, width, height); }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (!blob) return setError("Resizing failed. Try another format.");
      setError("");
      setOut(URL.createObjectURL(blob));
    }, format, 0.92);
  };

  const ext = format.split("/")[1].replace("jpeg", "jpg");

  return (
    <div className="space-y-5">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => load(e.target.files?.[0])} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); load(e.dataTransfer.files[0]); }}
        className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-muted-foreground transition-colors hover:border-primary hover:bg-accent"
      >
        <Upload className="h-6 w-6" />
        <span className="font-medium text-foreground">{img ? `${name} — ${img.naturalWidth}×${img.naturalHeight}` : "Click or drop an image here"}</span>
        <span className="text-xs">Processed on your device. Nothing is uploaded.</span>
      </button>

      {img && (
        <div className="grid gap-4 sm:grid-cols-4 sm:items-end">
          <div className="space-y-2"><Label htmlFor="ir-w">Width (px)</Label><Input id="ir-w" type="number" min={1} value={w} onChange={(e) => onW(e.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="ir-h">Height (px)</Label><Input id="ir-h" type="number" min={1} value={h} onChange={(e) => onH(e.target.value)} /></div>
          <div className="space-y-2">
            <Label htmlFor="ir-f">Format</Label>
            <select id="ir-f" value={format} onChange={(e) => setFormat(e.target.value as typeof format)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option>
            </select>
          </div>
          <label className="flex h-9 items-center gap-2 text-sm">
            <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="accent-primary" /> Keep proportions
          </label>
        </div>
      )}
      <ErrorText>{error}</ErrorText>
      <div className="flex flex-wrap gap-2">
        <Button onClick={resize} disabled={!img}>Resize image</Button>
        {out && <Button asChild variant="outline"><a href={out} download={`${name}-${w}x${h}.${ext}`}><Download className="h-4 w-4" /> Download</a></Button>}
      </div>
      {out && <img src={out} alt="Resized preview" className="max-h-80 rounded-xl border" />}
    </div>
  );
}
