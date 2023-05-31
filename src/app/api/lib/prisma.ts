import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

const prismaInstance = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['query', 'info', 'warn'],
    });
  }

  return prisma;
};

export default prismaInstance();