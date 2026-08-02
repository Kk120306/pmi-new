import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const createPrismaClient = (): PrismaClient => {
    const client = new PrismaClient();

    if (process.env.DATABASE_URL?.startsWith('prisma://')) {
        return client.$extends(withAccelerate()) as unknown as PrismaClient;
    }

    return client;
};

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

export const getPrismaClient = () => {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient();
    }

    return globalForPrisma.prisma;
};
