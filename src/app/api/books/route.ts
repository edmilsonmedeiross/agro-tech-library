import {NextResponse, NextRequest} from 'next/server';
import prisma from '../lib/prisma';
import { bookSchema } from '@/validations/bookSchema';

export async function GET(request: NextRequest) {
  try {
    await prisma.$connect();
    const page = Number(request.nextUrl.searchParams.get('page'));

    let books;

    if (!page) {
      books = await prisma.book.findMany();
    } else {
      books = await prisma.book.findMany({
        skip: (page - 1) * 10,
        take: 10,
        include: {
          author_fk: true,
          categories: true,
        }
      });
    }
    return NextResponse.json(books);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    await prisma.$connect();
    
    const { name, authorId, description, releaseDate, thumbnail } = bookSchema.parse(await request.json());
    
    const existBook = await prisma.book.findFirst({
      where: {
        name,
        authorId: Number(authorId),
      },
    });

    if (existBook) {
      return NextResponse.json({ message: 'Book already exists' }, { status: 409 });
    }

    const book = await prisma.book.create({
      data: {
        name,
        authorId: Number(authorId),
        description,
        releaseDate,
        thumbnail,
      },
    });

    return NextResponse.json(book);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
