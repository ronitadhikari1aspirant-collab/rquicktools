import QRCode from "qrcode";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorText } from "./ui";

const MAX = 1000;

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text.trim()) {
      setUrl("");
      setError("Enter some text or a link to generate a QR code.");
      return;
    }
    if (text.length > MAX) {
      setUrl("");
      setError(`Text is too long — keep it under ${MAX} characters.`);
      return;
    }
    setError("");
    QRCode.toDataURL(text, { width: size, margin: 2 })
      .then(setUrl)
      .catch(() => setError("Couldn't create a QR code for that text."));
  }, [text, size]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-text">Text or URL</Label>
          <Textarea id="qr-text" rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="https://..." />
          <div className="text-xs text-muted-foreground">{text.length}/{MAX}</div>
          <ErrorText>{error}</ErrorText>
        </div>
        <div className="space-y-2">
          <Label htmlFor="qr-size">Size: {size}px</Label>
          <input id="qr-size" type="range" min={128} max={1024} step={64} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-primary" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border bg-muted p-6">
        {url ? (
          <img src={url} alt="Generated QR code" className="h-56 w-56 rounded-lg bg-card" />
        ) : (
          <div className="grid h-56 w-56 place-items-center rounded-lg border border-dashed text-sm text-muted-foreground">No QR code yet</div>
        )}
        <Button asChild={!!url} disabled={!url}>
          {url ? (
            <a href={url} download="quicktools-qr.png"><Download className="h-4 w-4" /> Download PNG</a>
          ) : (
            <span><Download className="h-4 w-4" /> Download PNG</span>
          )}
        </Button>
      </div>
    </div>
  );
}
