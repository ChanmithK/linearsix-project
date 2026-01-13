import { z } from "zod";

// Book schema for validation
export const bookSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  author: z.string().trim().min(2, "Author is required"),
  category: z.string().trim().min(2, "Category is required"),
  coverUrl: z.string().trim().url("Cover URL must be a valid URL"),
  rating: z.number().min(0, "Min rating is 0").max(5, "Max rating is 5"),
});

export type BookFormValues = z.infer<typeof bookSchema>;
