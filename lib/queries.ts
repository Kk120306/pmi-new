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