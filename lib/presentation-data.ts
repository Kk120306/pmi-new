import { PresentationType } from '@prisma/client';

export const skeenaPresentation = {
    id: 1,
    title: 'Skeena Gold & Silver',
    slug: 'skeena-gold-silver',
    summary:
        'An equity research presentation on Skeena Gold & Silver, covering the Eskay Creek project, industry dynamics, investment thesis, valuation, key risks, and catalysts.',
    src: '/slides/skeena-gold-silver.pdf',
    imageUrl: '/slides/skeena-gold-silver-cover.jpg',
    tags: ['Equity Research', 'Mining', 'Gold & Silver'],
    type: PresentationType.SLIDES,
    pageCount: 37,
    publishedAt: new Date('2026-03-29T12:00:00.000Z'),
};

export const kyleTsujiPublicProfile = {
    id: 1,
    name: 'Kyle Tsuji',
    bio: 'Bcom @ UBC',
    profileImage: 'authors/kyle.jpg',
    contact: 'ktsuji@student.ubc.ca',
    role: 'Lead Analyst',
    linkedin: 'https://www.linkedin.com/in/kytsuj/',
    email: 'kyle@admin.com',
    password: '',
};
