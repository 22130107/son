const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Serve static files from public/uploads manually
    if (pathname && pathname.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", pathname);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".png": "image/png",
          ".webp": "image/webp",
          ".gif": "image/gif",
          ".svg": "image/svg+xml",
        };
        const contentType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000",
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
