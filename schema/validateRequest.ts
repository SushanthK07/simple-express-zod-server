import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export type ValidatedRequest<
  TData extends z.ZodObject<any> = z.ZodObject<any>
> = Request & {
  validatedData: z.infer<TData>;
};

export const validateRequest =
  <TData extends z.ZodObject<any>>(requestSchema: TData) =>
  (req: ValidatedRequest, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        ...req.query,
        ...req.body,
        ...req.params,
      };
      req.validatedData =  requestSchema.parse(requestData);
    } catch (err) {
      console.error(err);
      return res.status(400).send("Bad request");
    }

    next();
  };
