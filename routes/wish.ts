import { Request, Response } from "express";
import * as z from "zod";

const postSchema = z.object({
  names: z.array(z.string()),
});

const router = require("express").Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello " + req.query.name);
});

router.post("/", (req: Request, res: Response) => {
  let postData;
  try {
    postData = postSchema.parse(req.body);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request");
  }

  const names = postData.names;
  return res.send("Hello " + names.join(", "));
});

module.exports = router;
