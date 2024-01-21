const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname.replace("[]", "") + "-" + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;