import {z} from 'zod';
import { BookSchema } from '../validations/bookSchema';

export type BookProps = z.infer<typeof BookSchema>