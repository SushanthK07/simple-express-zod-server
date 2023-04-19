import { Response } from "express";
import {
  getRequestQuerySchema,
  postRequestBodySchema,
  postRequestParamsSchema,
  postResponseSchema,
} from "../schema/wish";
import { ValidatedRequest, validateRequest } from "../schema/validateRequest";

const router = require("express").Router();

router.get(
  "/",
  validateRequest({
    querySchema: getRequestQuerySchema,
  }),
  (req: ValidatedRequest<typeof getRequestQuerySchema>, res: Response) => {
    const { query } = req.validatedData;
    const name = query.name;
    const age = query.age;

    res.send("Hello " + name + " " + age);
  }
);

router.post(
  "/:by",
  validateRequest({
    bodySchema: postRequestBodySchema,
    paramsSchema: postRequestParamsSchema,
  }),
  (
    req: ValidatedRequest<
      typeof getRequestQuerySchema,
      typeof postRequestBodySchema,
      typeof postRequestParamsSchema
    >,
    res: Response
  ) => {
      const { body, params } = req.validatedData;
    const names = body.names;
    const by = params.by;
    const message = "Hello " + names.join(", ") + " by " + by;

    try {
      return res.send(postResponseSchema.parse({ message }));
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
