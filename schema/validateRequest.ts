import { Request, Response, NextFunction } from "express";
import * as z from "zod";

export type ValidatedRequest<
  TQuery extends z.ZodObject<any> = z.ZodObject<any>,
  TBody extends z.ZodObject<any> = z.ZodObject<any>,
  TParams extends z.ZodObject<any> = z.ZodObject<any>
> = Request & {
  validatedData: {
    query: z.infer<TQuery>;
    body: z.infer<TBody>;
    params: z.infer<TParams>;
  };
};

export const validateRequest =
  <
    TQuery extends z.ZodObject<any>,
    TBody extends z.ZodObject<any>,
    TParams extends z.ZodObject<any>
  >({
    querySchema,
    bodySchema,
    paramsSchema,
  }: {
    querySchema?: TQuery;
    bodySchema?: TBody;
    paramsSchema?: TParams;
  }) =>
  (req: ValidatedRequest, res: Response, next: NextFunction) => {
    let validatedQuery;
    let validatedBody;
    let validatedParams;

    try {
      validatedQuery = querySchema ? querySchema.parse(req.query) : {};
      validatedBody = bodySchema ? bodySchema.parse(req.body) : {};
      validatedParams = paramsSchema ? paramsSchema.parse(req.params) : {};
    } catch (err) {
      console.error(err);
      return res.status(400).send("Bad request");
    }

    req.validatedData = {
      query: validatedQuery,
      body: validatedBody,
      params: validatedParams,
    };

    next();
  };
