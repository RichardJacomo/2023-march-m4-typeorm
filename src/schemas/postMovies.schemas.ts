import * as z from "zod";

const postMovieSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional(),
  duration: z
    .number()
    .optional()
    .refine(
      (duration) => {
        return duration !== undefined && duration > 0;
      },
      { message: "Number must be greater than 0" }
    ),
  price: z.number().int(),
});

export { postMovieSchema };
