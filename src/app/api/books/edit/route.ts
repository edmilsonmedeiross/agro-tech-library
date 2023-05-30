import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    await prisma.$connect();
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
    await prisma.$disconnect();
  }
}