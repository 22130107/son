// Wrapper để 1Panel có thể start Next.js
// Tương đương với: npm start (next start)
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false });
const handle = app.getRequestHandler();

const UPLOADS_DIR = path.resolve(process.cwd(), "public", "uploads");

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Serve /uploads/ trực tiếp từ public/
    if (pathname && pathname.startsWith("/uploads/")) {
      let decodedPathname;
      try {
        decodedPathname = decodeURIComponent(pathname);
      } catch {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
        return;
      }

      const relativePath = decodedPathname
        .slice("/uploads/".length)
        .replace(/^[\/\\]+/, "");
      const filePath = path.resolve(UPLOADS_DIR, relativePath);

      if (!filePath.startsWith(UPLOADS_DIR + path.sep) && filePath !== UPLOADS_DIR) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        res.end("Forbidden");
        return;
      }

      try {
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".png": "image/png",
              ".webp": "image/webp",
              ".gif": "image/gif",
              ".svg": "image/svg+xml",
            };
            res.writeHead(200, {
              "Content-Type": mimeTypes[ext] || "application/octet-stream",
              "Cache-Control": "no-cache, no-store, must-revalidate",
            });
            const stream = fs.createReadStream(filePath);
            stream.on("error", (streamErr) => {
              console.error("Stream error:", streamErr);
              if (!res.headersSent) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
              } else {
                res.destroy();
              }
            });
            stream.pipe(res);
            return;
          }
        }
      } catch (fileErr) {
        console.error("Error reading static file:", fileErr);
      }
    }

    handle(req, res, parsedUrl);
  }).listen(port, "0.0.0.0", () => {
    console.log(`> Ready on http://0.0.0.0:${port}`);
  });
}).catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
