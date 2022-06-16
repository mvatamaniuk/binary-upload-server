import { Router } from "express";

import fileRoutes from "./files/files.api";

export default () => {
  const app = Router();

  fileRoutes(app);

  return app;
};
