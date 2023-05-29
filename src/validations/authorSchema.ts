import { z } from 'zod';

export const AuthorSchema = z.object({
  name: z.string().min(3),
  birthDate: z
    .coerce
    .date()
    .refine((date) => !isNaN(date.getTime()), {
      message: 'A data de nascimento é inválida',
    }),
  bio: z.string().min(5),
});
