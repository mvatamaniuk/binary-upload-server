import { Response } from "express";

export class ApiResponses {
  public static _200(res: Response, body: { [key: string]: any }) {
    return res.status(200).json(body);
  }

  public static _400(res: Response, message: string) {
    return res.status(400).json(message);
  }
}
