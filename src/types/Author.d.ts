import { AuthorSchema } from '@/validations/authorSchema';
import { z } from 'zod';

export interface AuthorProps extends z.infer<typeof AuthorSchema> {
  id?: number;
  selected?: boolean;
}