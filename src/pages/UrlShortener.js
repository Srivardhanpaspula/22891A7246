import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { logger } from "../utils/logger";

export default function UrlShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const [urls, setUrls] = useState(
    JSON.parse(localStorage.getItem("urls") || "[]")
  );

  const generateCode = () => Math.random().toString(36).substring(2, 7);

  const handleShorten = () => {

    if (!/^https?:\/\/.+/.test(longUrl)) {
      logger.error("Invalid URL attempt", { longUrl });
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    let code = shortcode.trim() || generateCode();

    if (urls.some((u) => u.code === code)) {
      alert("Shortcode already exists, try another one!");
      return;
    }

    const newEntry = {
      longUrl,
      code,
      expiry: Date.now() + validity * 60000,
      clicks: [],
    };

    const updated = [...urls, newEntry];
    setUrls(updated);
    localStorage.setItem("urls", JSON.stringify(updated));

    logger.info("Shortened new URL", newEntry);

    setLongUrl("");
    setValidity(30);
    setShortcode("");
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          React URL Shortener
        </Typography>

        <TextField
          label="Enter Long URL"
          fullWidth
          margin="normal"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <TextField
          label="Validity (minutes)"
          type="number"
          fullWidth
          margin="normal"
          value={validity}
          onChange={(e) => setValidity(Number(e.target.value))}
        />

        <TextField
          label="Custom Shortcode (optional)"
          fullWidth
          margin="normal"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleShorten}>
          Shorten URL
        </Button>

        {urls.map((u) => (
          <Typography key={u.code} sx={{ mt: 2 }}>
            {u.longUrl} →{" "}
            <a href={`/${u.code}`} target="_blank" rel="noreferrer">
              {window.location.origin}/{u.code}
            </a>{" "}
            (Expires in {Math.max(0, Math.floor((u.expiry - Date.now()) / 60000))} min)
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
