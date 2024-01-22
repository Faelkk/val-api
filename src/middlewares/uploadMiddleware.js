const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../uploads/"),
  filename(req, file, callback) {
    callback(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
