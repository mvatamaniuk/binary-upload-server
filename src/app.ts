import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";

import router from "./api/router";
import { MONGO_URL, PORT } from "./config/env.config";

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use(router());

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

run();
