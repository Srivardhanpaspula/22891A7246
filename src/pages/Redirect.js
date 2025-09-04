import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logger } from "../utils/logger";

export default function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls") || "[]");
    const entry = urls.find((u) => u.code === shortcode);

    if (!entry) {
      logger.error("Invalid shortcode access", { shortcode });
      alert("Invalid or unknown link");
      navigate("/");
      return;
    }

    if (Date.now() > entry.expiry) {
      logger.error("Expired link accessed", entry);
      alert("This shortened link has expired.");
      navigate("/");
      return;
    }

    // Track click
    entry.clicks.push({
      time: new Date().toISOString(),
      source: document.referrer || "direct",
      geo: "Unknown",
    });

    localStorage.setItem("urls", JSON.stringify(urls));
    logger.info("Redirecting user", { shortcode, destination: entry.longUrl });

    window.location.href = entry.longUrl;
  }, [shortcode, navigate]);

  return null;
}
