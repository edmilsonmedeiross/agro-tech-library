import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { bookSchema } from '@/validations/bookSchema';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    const book = await prisma.book.findFirst({
      where: {
        id,
      },
      include: {
        author_fk: true,
        categories: true,
      }
    });

    if (!book) {
      return NextResponse.json({ message: 'Livro não encontrado!' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    await prisma.$connect();

    const id = Number(context.params.id);
    const result = bookSchema.safeParse(await request.json());

    if (!result.success) {
      return NextResponse.json({ message: JSON.parse(result.error.message) }, { status: 400 });
    }

    const existingBook = await prisma.book.findFirst({
      where: {
        id,
      },
    });
  
    if (!existingBook) {
      return NextResponse.json({ message: 'Livro não encontrado!' }, { status: 404 });
    }

    const { name, authorId, description, releaseDate, thumbnail } = result.data;

    const updatedBook = await prisma.book.update({
      where: {
        id,
      },
      data: {
        name,
        authorId: Number(authorId),
        description,
        releaseDate,
        thumbnail,
      },
    });

    return NextResponse.json({ message: 'Autor atualizado com sucesso!', newBook: updatedBook });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    
    const existingBook = await prisma.book.findFirst({
      where: {
        id,
      },
    });
    
    if (!existingBook) {
      return NextResponse.json({ message: 'Livro não encontrado!' }, { status: 404 });
    }
  
    const deletedBook = await prisma.book.delete({
      where: {
        id: existingBook.id,
      },
    });
  
    return NextResponse.json({ message: 'Livro deletado com sucesso!', deletedBook: deletedBook, });

  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}