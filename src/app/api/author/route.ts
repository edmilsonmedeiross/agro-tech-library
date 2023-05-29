import { NextRequest, NextResponse } from 'next/server';
import prisma from '../lib/prisma';
import { AuthorSchema } from '@/validations/authorSchema';

export async function GET() {
  try {
    const authors = await prisma.author.findMany();
    return NextResponse.json(authors);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = AuthorSchema.safeParse(await request.json());

    if (!result.success) {
      return NextResponse.json(
			{ message: JSON.parse(result.error.message) },
			{ status: 400 }
		);
    }

    const { name, birthDate, bio } = result.data;

    const existingAuthor = await prisma.author.findFirst({
      where: {
        name,
        birthDate,
      },
    });

    if (existingAuthor) {
		// Já existe um autor com o mesmo nome e data de nascimento
      return NextResponse.json(
			{ message: 'autor já cadastrado!' },
			{ status: 409 }
		);
    }

    const newAuthor = await prisma.author.create({
      data: {
        name: name,
        birthDate: birthDate,
        bio: bio,
      },
    });

    return NextResponse.json(newAuthor);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
