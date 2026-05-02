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

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Serve /uploads/ trực tiếp từ public/
    if (pathname && pathname.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", pathname);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
          ".png": "image/png", ".webp": "image/webp",
          ".gif": "image/gif", ".svg": "image/svg+xml",
        };
        res.writeHead(200, {
          "Content-Type": mimeTypes[ext] || "application/octet-stream",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        });
        fs.createReadStream(filePath).pipe(res);
        return;
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
