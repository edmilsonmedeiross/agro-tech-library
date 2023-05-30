import { z } from 'zod';

export const bookSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  releaseDate: z.string(),
  // author: z.string(),
  authorId: z.string(),
  thumbnail: z.string().url(),
  category: z.string(),
});