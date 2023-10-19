import * as z from "zod";

const pacthMovieSchema = z.object({
  name: z.string().max(50).optional(),
  description: z.string().optional(),
  duration: z
    .number()
    .refine(
      (duration) => {
        return duration !== undefined && duration > 0;
      },
      { message: "Number must be greater than 0" }
    )
    .optional(),
  price: z.number().int().optional(),
});

export { pacthMovieSchema };
