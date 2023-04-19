import { Request, Response } from "express";
import * as z from "zod";

const postRequestBodySchema = z.object({
  names: z.array(z.string()),
});

const postRequestParamsSchema = z.object({
  by: z.string().refine((value) => !["undefined", "null"].includes(value), {
    message: "by should be defined",
  }),
});

const postResponseSchema = z.object({
  message: z.string(),
});

const router = require("express").Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello " + req.query.name);
});

router.post("/:by", (req: Request, res: Response) => {
  let validatedBody;
  let validatedParams;

  try {
    validatedBody = postRequestBodySchema.parse(req.body);
    validatedParams = postRequestParamsSchema.parse(req.params);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  const names = validatedBody.names;
  const by = validatedParams.by;
  const message = "Hello " + names.join(", ") + " by " + by;

  try {
    return res.send(postResponseSchema.parse({ message }));
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
