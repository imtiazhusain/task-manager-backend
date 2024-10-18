import { v2 as cloudinary } from "cloudinary";
import { CLOUNDINARY_CLOUD_NAME,CLOUNDINARY_API_KEY,CLOUNDINARY_AP_ISECRET } from "../config/envConfig";

cloudinary.config({
  cloud_name: CLOUNDINARY_CLOUD_NAME,
  api_key: CLOUNDINARY_API_KEY,
  api_secret: CLOUNDINARY_AP_ISECRET,
});

export default cloudinary;
