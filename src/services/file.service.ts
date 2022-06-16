import { readFileSync } from "fs";
import { join } from "path";

import fileSchema from "../database/schemas/file/file.schema";

export class FileService {
  static async uploadFile(file: Express.Multer.File) {
    const newFile = new fileSchema({
      name: file.originalname,
      source: {
        file: readFileSync(
          join(__dirname + "../../../uploads/fileOne/" + file.filename)
        ),
      },
    });

    return newFile.save();
  }

  static async getFiles() {
    const files = await fileSchema.find({});

    const base64Files = files.map((file) => ({
      name: file.name,
      source: {
        file: Buffer.from(file.source.file).toString("base64"),
      },
    }));

    return base64Files;
  }
}
