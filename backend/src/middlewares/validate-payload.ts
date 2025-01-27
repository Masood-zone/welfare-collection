import { RequestHandler, Request, Response, NextFunction } from "express";
 import allowedFields from "../../allowedFields.json";
import { HttpStatus } from "../utils/http-status";
export const validatePayload: (model: string) => RequestHandler =
  (model) => async (req: Request, res: Response, next: NextFunction) => {
    const modelFields = await allowedFields.find(
      (field) => field.modelName === model
    );
    const payload = req.body;
    const dataFields = Object.keys(payload);
    const unwantedFields = dataFields.filter(
      (field) => !modelFields?.fields.includes(field)
    );

    if (unwantedFields.length > 0) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: "unwanted fields are not allowed",
          fields: unwantedFields,
        });
    } else {
      next();
    }
  };
  
