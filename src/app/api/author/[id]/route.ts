import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { AuthorSchema } from '@/validations/authorSchema';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    const author = await prisma.author.findFirst({
      where: {
        id,
      },
    });

    if (!author) {
      return NextResponse.json({ message: 'Autor não encontrado!' }, { status: 404 });
    }

    return NextResponse.json(author);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id);
    const result = AuthorSchema.safeParse(await request.json());

    if (!result.success) {
      return NextResponse.json({ message: JSON.parse(result.error.message) }, { status: 400 });
    }

    const { name, birthDate, bio } = result.data;

    const existingAuthor = await prisma.author.findFirst({
      where: {
        id,
      },
    });
  
    if (!existingAuthor) {
      return NextResponse.json({ message: 'autor não encontrado!' }, { status: 404 });
    }

    const updatedAuthor = await prisma.author.update({
      where: {
        id,
      },
      data: {
        name: name,
        birthDate: birthDate,
        bio: bio,
      },
    });

    return NextResponse.json({ message: 'Autor atualizado com sucesso!', newAuthor: updatedAuthor });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  
  const existingAuthor = await prisma.author.findFirst({
    where: {
      id,
    },
  });
  
  if (!existingAuthor) {
    return NextResponse.json({ message: 'autor não encontrado!' }, { status: 404 });
  }

  const deletedAuthor = await prisma.author.delete({
    where: {
      id: existingAuthor.id,
    },
  });

  return NextResponse.json({ message: 'Autor deletado com sucesso!', deletedAuthor, });
}