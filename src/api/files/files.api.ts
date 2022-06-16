import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

import { ApiResponses } from "../../helpers/api.respones";
import { FileService } from "../../services/file.service";

const FILENAME = "file";

const router = Router();

const storage = multer.diskStorage({
  destination: "./uploads/fileOne/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

export default (app: Router) => {
  app.use("/files", router);

  router.get("/get", async (req: Request, res: Response) => {
    try {
      const files = await FileService.getFiles();

      return ApiResponses._200(res, { status: "ok", files });
    } catch (err) {
      return ApiResponses._400(res, "Error");
    }
  });

  router.post(
    "/",
    upload.single(FILENAME),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return;

        await FileService.uploadFile(req.file);

        return ApiResponses._200(res, { status: "ok" });
      } catch (err) {
        console.log("err", err);
        return ApiResponses._400(res, "Error");
      }
    }
  );
};
