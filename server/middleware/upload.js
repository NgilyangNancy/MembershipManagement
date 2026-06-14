const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^(image\/|application\/pdf)/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only images / PDF allowed"));
  },
});
