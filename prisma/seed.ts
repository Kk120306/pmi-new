import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    await prisma.article.deleteMany();
    await prisma.author.deleteMany();

    const password = await bcrypt.hash("admin123", 10);

    await prisma.author.create({
        data: {
            id: 1,
            name: "Kyle Tsuji",
            bio: "Bcom @ UBC",
            profileImage: "authors/kyle.jpg",
            contact: "ktsuji@student.ubc.ca",
            role: "Lead Analyst",
            linkedin: "https://www.linkedin.com/in/kytsuj/",
            email: "kyle@admin.com",
            password,
            articles: {
                create: [
                    {
                        id: 1,
                        title: "Brand Genericization: Tupperware’s Decline and Google’s Success",
                        slug: "genericization-tupperware-google",
                        summary: "The article explores the concept of brand genericization, where a brand name becomes synonymous with a whole product category. It discusses how this phenomenon can lead to either the growth or decline of a company, using examples like Google and Tupperware, and highlights the strategic challenges businesses face in managing their brand identity.",
                        src: "19CJ8rbnAwiiUNblpD1xZW9YOMm6jCH7c",
                        tags: ["Strategy", "Innovation"],
                        publishedAt: new Date("2025-02-02"),
                    },
                    {
                        id: 3,
                        title: "Netflix Equity Research Report",
                        slug: "netflix-equity-research",
                        summary: "This report provides an in-depth analysis of Netflix’s equity performance, evaluating its revenue growth, subscriber trends, and position in the streaming industry.",
                        src: "1uxk1euFKHQ6XsyxKP2DVZneuaIiVMxat",
                        tags: ["Equity Research"],
                        publishedAt: new Date("2025-05-01"),
                    },
                    {
                        id: 4, 
                        title : "Eldorado Gold Corporation Thesis",
                        slug: "eldorado-gold-thesis",
                        summary: "This article presents a comprehensive investment thesis on Eldorado Gold Corporation, analyzing its financial health, market position, and growth prospects in the mining industry.",
                        src: "1tlJps2igXKYBjiEgnMTOtGs9XrwVUBRe",
                        tags: ["Investment Thesis"],
                        publishedAt: new Date("2025-07-16"),
                    }
                ],
            },
        },
    });

    await prisma.author.create({
        data: {
            id: 2,
            name: "Kai Kameyama",
            bio: "Bcom @ UBC",
            profileImage: "authors/kai.jpeg",
            contact: "kkamey01@student.ubc.ca",
            role: "Lead Developer",
            linkedin: "www.linkedin.com/in/kaikameyama",
            email: "kai@admin.com",
            password,
        },
    });

    await prisma.author.create({
        data: {
            id: 3,
            name: "Anderson Ko",
            bio: "Bcom @ UBC",
            profileImage: "authors/ander.jpg",
            contact: "kohc.anderson@gmail.com",
            role: "Jr Analyst",
            linkedin: "https://www.linkedin.com/in/anderson-ko/",
            email: "anderson@admin.com",
            password,
            articles: {
                create: [
                    {
                        id: 2,
                        title: "Walmart Equity Research Report",
                        slug: "walmart-equity-research",
                        summary: "This report analyzes Walmart’s equity performance, exploring the company’s financial position, market trends, and future growth potential in the retail sector.",
                        src: "1zmuJQE0rqSfLFDTeYkesxJ9V-f0qBsME",
                        tags: ["Equity Research"],
                        publishedAt: new Date("2025-03-10"),
                    },
                ],
            },
        },
    });

    await prisma.author.create({
        data: {
            id: 4,
            name: "Luke Delahunty",
            bio: "Bcom @ UBC",
            profileImage: "authors/luke.jpg",
            contact: "lukedelahunty8@gmail.com",
            role: "Jr Analyst",
            linkedin: "https://www.linkedin.com/in/luke-delahunty",
            email: "luke@admin.com",
            password,
        },
    });
}

main()
    .then(() => console.log("Seeded authors with articles and hashed passwords"))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
