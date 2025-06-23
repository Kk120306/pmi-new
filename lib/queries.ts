import prisma from '@/lib/prisma';

export async function findNewestArticle() {
    const article = await prisma.article.findFirst({
        orderBy: {
            publishedAt: 'desc',
        },
    });

    return article;
}


export async function getAllAuthors() {
    const authors = await prisma.author.findMany()
    return authors;
}

export async function getRecentArticles() {
    const limit = 3;
    const articles = await prisma.article.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
        take: limit,
    });
    return articles;
}

export async function getAllArticles() {
    const articles = await prisma.article.findMany({
        orderBy: {
            publishedAt: 'desc',
        },
    });
    return articles;
}

export async function getDataBySlug(slug: string) {
    const article = await prisma.article.findUnique({
        where: {
            slug: slug,
        },
        include: {
            author: true,
        }
    });
    return article;
}