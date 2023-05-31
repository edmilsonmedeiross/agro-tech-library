'use server';
import prisma from './app/api/lib/prisma';
import { book, author, category } from '@prisma/client';
import { AuthorProps } from './types/Author';
import { BookProps } from './types/Book';
import { BookCardProps } from './components/BookCard';

interface BookFromPrisma extends book {
	author_fk: author;
	categories: category[];
}

export const toBookProps = (book: BookFromPrisma): BookCardProps => ({
  ...book,
  id: String(book.id),
  authorId: String(book.authorId),
  author_fk: {
    ...book.author_fk,
    birthDate: book.author_fk.birthDate.toISOString(),
  },
  categories: book.categories.map((category) => ({
    ...category,
    id: String(category.id),
  })),
});

export const getAuthors = async (): Promise<AuthorProps[] | undefined> => {
  try {
    await prisma.$connect();

    const authors = await prisma.author.findMany();

    return authors;
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const getAuthorById = async (id: number): Promise<AuthorProps | undefined> => {
  try {
    await prisma.$connect();
    const author = await prisma.author.findUnique({
      where: {
        id,
      },
    });

    if (!author) {
      throw new Error('Autor não encontrado!');
    }

    return author;
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const createAuthor = async (data: AuthorProps) => {
  try {
    await prisma.$connect();
    const existingAuthor = await prisma.author.findFirst({
      where: {
        name: data.name,
        birthDate: data.birthDate,
      },
    });

    if (existingAuthor) {
      throw new Error('Autor já cadastrado!');
    }

    const author = await prisma.author.create({
      data,
    });

    return author;

  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const updateAuthor = async (id: number, data: AuthorProps) => {
  try {
    await prisma.$connect();
    const existingAuthor = await prisma.author.findFirst({
      where: {
        id,
      },
    });

    if (!existingAuthor) {
      throw new Error('Autor não encontrado!');
    }

    const author = await prisma.author.update({
      where: {
        id,
      },
      data,
    });

    return author;

  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const deleteAuthor = async (id: number) => {
  try {
    await prisma.$connect();
    const existingAuthor = await prisma.author.findFirst({
      where: {
        id,
      },
    });

    if (!existingAuthor) {
      throw new Error('Autor não encontrado!');
    }

    const author = await prisma.author.delete({
      where: {
        id,
      },
    });

    return author;

  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const getBooks = async () => {
  try {
    await prisma.$connect();
    const books = await prisma.book.findMany({
      include: {
        categories: true,
        author_fk: true,
      },
    });

    return books.map(toBookProps);

  } catch (err) {
    console.log(err);

  } finally {

    await prisma.$disconnect();
  }
};

export const getBooksPerPage = async (page: number, perPage: number) => {
  try {
    await prisma.$connect();
    const skip = (page - 1) * perPage;
    const books = await prisma.book.findMany({
      skip: skip >= 0 ? skip : 0,
      take: perPage,
      include: {
        categories: true,
        author_fk: true,
      },
    });

    return books.map(toBookProps);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

export const getBookById = async (id: number): Promise<BookCardProps | undefined> => {
  try {
    await prisma.$connect();
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        author_fk: true,
        categories: true,
      },
    });

    await prisma.$disconnect();

    if (!book) {
      throw new Error('Livro não encontrado!');
    }

    return toBookProps(book);
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const createBook = async (data: BookProps) => {
  try {
    await prisma.$connect();
    const book = await prisma.book.create({
      data: {
        description: data.description,
        name: data.name,
        authorId: Number(data.authorId),
        releaseDate: data.releaseDate,
        thumbnail: data.thumbnail,
      },
    });

    return book;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateBook = async (id: number, data: BookProps) => {
  try {
    await prisma.$connect();
    const book = await prisma.book.update({
      where: {
        id,
      },
      data: {
        description: data.description,
        name: data.name,
        authorId: Number(data.authorId),
        releaseDate: data.releaseDate,
        thumbnail: data.thumbnail,
      },
    });

    return book;
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const deleteBook = async (id: number) => {
  try {
    await prisma.$connect();
    const book = await prisma.book.delete({
      where: {
        id,
      },
    });
  
    return book;
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const getBooksByAuthorId = async (id: number) => {
  try {
    await prisma.$connect();
    const books = await prisma.book.findMany({
      where: {
        authorId: id,
      },
      include: {
        author_fk: true,
        categories: true,
      },
    });

    return books.map(toBookProps);
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};

export const getCategories = async () => {
  try {
    await prisma.$connect();

    const categories = await prisma.category.findMany();

    return categories;
  } catch (err) {
    console.log(err);

  } finally {
    await prisma.$disconnect();
  }
};
