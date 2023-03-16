const multer = require("multer");
const path = require("path");
// ==================================================== //

const tempDirPath = path.join(__dirname, "../", "temp"); // Path to folder where images are stored temporary

const multerConfig = multer.diskStorage({
  destination: tempDirPath,

  // keeping original file's name
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: multerConfig });

module.exports = uploadFile;
