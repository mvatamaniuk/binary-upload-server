import mongoose, { Schema, Document } from "mongoose";
import { IFile } from "../../../types/interfaces/IFile";

const FileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    file: {
      type: Buffer,
      required: true,
    },
  },
});

export default mongoose.model<IFile & Document>("File", FileSchema);
