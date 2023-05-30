import {z} from 'zod';
import { bookSchema } from '../validations/bookSchema';

export type BookProps = z.infer<typeof bookSchema>