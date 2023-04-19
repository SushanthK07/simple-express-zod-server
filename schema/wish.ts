import * as z from "zod";

const getRequestSchema = z.object({
  name: z.string(),
  age: z.coerce.number().optional(),
});

const postRequestSchema = z.object({
  names: z.array(z.string()),
  by: z.string().refine((value) => !["undefined", "null"].includes(value), {
    message: "by should be defined",
  }),
});

const postResponseSchema = z.object({
  message: z.string(),
});

export {
  getRequestSchema,
  postRequestSchema,
  postResponseSchema,
};
