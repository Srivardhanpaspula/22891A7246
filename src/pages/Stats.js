import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(stored);
  }, []);

  return (
    <Card sx={{ maxWidth: 700, margin: "20px auto", p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          URL Statistics
        </Typography>

        {urls.length === 0 && (
          <Typography>No shortened URLs found in this session.</Typography>
        )}

        {urls.map((u) => (
          <div key={u.code}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {window.location.origin}/{u.code}
            </Typography>
            <Typography variant="body2">Original: {u.longUrl}</Typography>
            <Typography variant="body2">
              Expiry: {new Date(u.expiry).toLocaleString()}
            </Typography>
            <Typography variant="body2">Total Clicks: {u.clicks.length}</Typography>

            {u.clicks.map((c, i) => (
              <Typography key={i} variant="body2" color="text.secondary">
                {c.time} | Source: {c.source} | Geo: {c.geo}
              </Typography>
            ))}
            <Divider sx={{ my: 1 }} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
