import { z } from 'zod';

export const bookSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  releaseDate: z
  .coerce
  .date()
  .refine((date) => !isNaN(date.getTime()), {
    message: 'A data de nascimento é inválida',
  }),
  authorId: z.string(),
  thumbnail: z.string().url(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string().optional(),
  })).refine((categories) => categories.length, {
    message: 'É necessário informar ao menos uma categoria',
  })
});