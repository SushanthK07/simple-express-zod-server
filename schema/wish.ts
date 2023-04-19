import * as z from "zod";

const getRequestQuerySchema = z.object({
  name: z.string(),
  age: z.coerce.number().optional(),
});

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

export {
  getRequestQuerySchema,
  postRequestBodySchema,
  postRequestParamsSchema,
  postResponseSchema,
};
