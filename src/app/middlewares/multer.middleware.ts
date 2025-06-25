import multer from "multer";
import path from "path";

class MulterMiddleware {
  private path: string;
  private maxSizeInMb: number;

  constructor(path: string, maxSizeInMb: number) {
    this.path = path;
    this.maxSizeInMb = maxSizeInMb;
  }

  public get upload(): multer.Multer {
    return multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.path);
        },
        filename: (req, file, cb) => {
          let fileExtension = "";
          if (file.originalname.split(".").length > 1) {
            fileExtension = file.originalname.substring(
              file.originalname.lastIndexOf("."),
            );
          }
          const filenameWithoutExtension = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-")
            ?.split(".")[0];
          cb(
            null,
            filenameWithoutExtension +
              Date.now() +
              Math.ceil(Math.random() * 1e5) + // avoid rare name conflict
              fileExtension,
          );
        },
      }),
      limits: {
        fileSize: this.maxSizeInMb * 1024 * 1024,
      },
    });
  }
}

//AVATAR FILE HANDLING MIDDLEWARE
const avatarUpload = new MulterMiddleware(
  path.join(path.resolve(), "/public/avatar"),
  5,
).upload.single("avatar");

const bodyParse = new MulterMiddleware(
  path.join(path.resolve(), "/public"),
  5,
).upload.none();

export { bodyParse, avatarUpload };
