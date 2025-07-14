// import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
// import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      // '/root/server/morfitter-backend-deploy/uploads'
      'D:/Office/selinam_backend/uploads',
    );
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName); // Save file with the unique name
  },
});

export const upload = multer({ storage: storage });
