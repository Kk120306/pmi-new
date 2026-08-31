import type { Prisma } from '@prisma/client';

type PublicAuthorIdentity = {
    email: string;
    name: string;
};

const excludedPublicAuthor = {
    email: 'luke@admin.com',
    name: 'Luke Delahunty',
} as const;

const normalizeIdentity = (value: string) => value.trim().toLocaleLowerCase('en');

export const publicAuthorWhere = {
    AND: [
        {
            email: {
                not: excludedPublicAuthor.email,
                mode: 'insensitive',
            },
        },
        {
            name: {
                not: excludedPublicAuthor.name,
                mode: 'insensitive',
            },
        },
    ],
} satisfies Prisma.AuthorWhereInput;

export const isPublicAuthor = ({ email, name }: PublicAuthorIdentity) =>
    normalizeIdentity(email) !== excludedPublicAuthor.email &&
    normalizeIdentity(name) !== normalizeIdentity(excludedPublicAuthor.name);

export const filterPublicAuthors = <Author extends PublicAuthorIdentity>(
    authors: Author[],
) => authors.filter(isPublicAuthor);
