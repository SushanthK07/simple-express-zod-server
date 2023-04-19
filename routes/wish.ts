import { Request, Response } from "express";
import * as z from "zod";

const postRequestSchema = z.object({
  names: z.array(z.string()),
});

const postResponseSchema = z.object({
  message: z.string(),
});

const router = require("express").Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello " + req.query.name);
});

router.post("/", (req: Request, res: Response) => {
  let postData;
  try {
    postData = postRequestSchema.parse(req.body);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  const names = postData.names;
  const message = "Hello " + names.join(", ");

  try {
    return res.send(postResponseSchema.parse({ message }));
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
