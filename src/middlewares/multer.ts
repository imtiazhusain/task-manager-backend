import multer from "multer";
import path from "path";
// using multer for uploading images of items
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload  = multer({
  storage: storage,
});

export default upload;
