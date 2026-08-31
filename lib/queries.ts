import { getPrismaClient } from '@/lib/prisma';
import { Prisma, PresentationType } from '@prisma/client';
import {
    kyleTsujiPublicProfile,
    skeenaPresentation,
} from '@/lib/presentation-data';
import {
    filterPublicAuthors,
    publicAuthorWhere,
} from '@/lib/public-authors';

const hasDatabase = () => Boolean(process.env.DATABASE_URL);
const database = () => getPrismaClient();
type PresentationWithAuthor = Prisma.PresentationGetPayload<{
    include: { author: true };
}>;

const localPresentations = [
    {
        ...skeenaPresentation,
        authorId: kyleTsujiPublicProfile.id,
        author: kyleTsujiPublicProfile,
    },
];

const isMissingPresentationTable = (error: unknown) =>
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2021';

export async function findNewestArticle() {
    if (!hasDatabase()) {
        return null;
    }

    const article = await database().article.findFirst({
        orderBy: {
            publishedAt: 'desc',
        },
    });

    return article;
}


export async function getPublicAuthors() {
    if (!hasDatabase()) {
        return [];
    }

    const authors = await database().author.findMany({
        where: publicAuthorWhere,
    });

    return filterPublicAuthors(authors);
}

export async function getRecentArticles() {
    if (!hasDatabase()) {
        return [];
    }

    const limit = 3;
    const articles = await database().article.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
        take: limit,
    });
    return articles;
}

export async function getAllArticles() {
    if (!hasDatabase()) {
        return [];
    }

    const articles = await database().article.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
    });
    return articles;
}

export async function getDataBySlug(slug: string) {
    if (!hasDatabase()) {
        return null;
    }

    const article = await database().article.findUnique({
        where: {
            slug: slug,
        },
        include: {
            author: true,
        }
    });
    return article;
}

export async function getPresentationsByType(
    type: PresentationType,
): Promise<PresentationWithAuthor[]> {
    if (!hasDatabase()) {
        return localPresentations.filter(
            (presentation) => presentation.type === type,
        );
    }

    try {
        return await database().presentation.findMany({
            where: {
                type,
            },
            include: {
                author: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });
    } catch (error) {
        if (isMissingPresentationTable(error)) {
            return localPresentations.filter(
                (presentation) => presentation.type === type,
            );
        }

        throw error;
    }
}

export async function findNewestPublication(): Promise<PresentationWithAuthor | null> {
    if (!hasDatabase()) {
        return localPresentations[0] ?? null;
    }

    try {
        return await database().presentation.findFirst({
            include: {
                author: true,
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });
    } catch (error) {
        if (isMissingPresentationTable(error)) {
            return localPresentations[0] ?? null;
        }

        throw error;
    }
}

export async function getPresentationBySlug(
    slug: string,
    type?: PresentationType,
): Promise<PresentationWithAuthor | null> {
    if (!hasDatabase()) {
        return (
            localPresentations.find(
                (presentation) =>
                    presentation.slug === slug &&
                    (!type || presentation.type === type),
            ) ?? null
        );
    }

    try {
        return await database().presentation.findFirst({
            where: {
                slug,
                ...(type ? { type } : {}),
            },
            include: {
                author: true,
            },
        });
    } catch (error) {
        if (isMissingPresentationTable(error)) {
            return (
                localPresentations.find(
                    (presentation) =>
                        presentation.slug === slug &&
                        (!type || presentation.type === type),
                ) ?? null
            );
        }

        throw error;
    }
}


export async function getAuthorByEmail(email: string) {
    if (!hasDatabase()) {
        return null;
    }

    const author = await database().author.findUnique({
        where: {
            email: email,
        },
    });
    return author;
}
