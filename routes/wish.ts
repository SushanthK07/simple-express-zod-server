import { Response } from "express";
import {
  getRequestSchema,
  postRequestSchema,
  postResponseSchema,
} from "../schema/wish";
import { ValidatedRequest, validateRequest } from "../schema/validateRequest";

const router = require("express").Router();

router.get(
  "/",
  validateRequest(getRequestSchema),
  (req: ValidatedRequest<typeof getRequestSchema>, res: Response) => {
    const validatedData = req.validatedData;
    const name = validatedData.name;
    const age = validatedData.age;

    res.send("Hello " + name + " " + age);
  }
);

router.post(
  "/:by",
  validateRequest(postRequestSchema),
  (req: ValidatedRequest<typeof postRequestSchema>, res: Response) => {
    const validatedData = req.validatedData;
    const names = validatedData.names;
    const by = validatedData.by;
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
