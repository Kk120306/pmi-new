import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PresentationType } from '@prisma/client';
import {
    ArrowLeft,
    CalendarDays,
    Download,
    FileText,
    Mail,
} from 'lucide-react';
import PDFPreview from '@/app/ui/articles/PDFPreview';
import { getPresentationBySlug } from '@/lib/queries';

export const dynamic = 'force-dynamic';

type SlidePageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({
    params,
}: SlidePageProps): Promise<Metadata> {
    const { slug } = await params;
    const presentation = await getPresentationBySlug(
        slug,
        PresentationType.SLIDES,
    );

    if (!presentation) {
        return {
            title: 'Slides Not Found | Pacific Market Insights',
        };
    }

    return {
        title: `${presentation.title} | Pacific Market Insights`,
        description: presentation.summary,
    };
}

export default async function SlidePage({ params }: SlidePageProps) {
    const { slug } = await params;
    const presentation = await getPresentationBySlug(
        slug,
        PresentationType.SLIDES,
    );

    if (!presentation) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f2f0e9] text-[#101820]">
            <section className="border-b border-white/10 bg-[#0b1f38] px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/slides"
                        className="mb-10 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        All slides
                    </Link>

                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#dfb84d]">
                                Equity research presentation
                            </p>
                            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
                                {presentation.title}
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                {presentation.summary}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-2">
                                {presentation.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="border border-[#dfb84d]/35 bg-[#dfb84d]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#f0cd70]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-hidden border border-white/10 bg-white shadow-2xl shadow-black/30">
                            <Image
                                src={presentation.imageUrl}
                                alt={`${presentation.title} cover`}
                                width={1247}
                                height={935}
                                priority
                                className="aspect-[4/3] w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
                <div className="grid gap-8 border-b border-black/15 pb-12 md:grid-cols-[1fr_auto] md:items-end">
                    <div className="flex items-center gap-4">
                        <Image
                            src={`/${presentation.author.profileImage}`}
                            alt={presentation.author.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-full border border-black/15 object-cover"
                        />
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a731b]">
                                Prepared by
                            </p>
                            <h2 className="mt-1 text-xl font-semibold">
                                {presentation.author.name}
                            </h2>
                            <a
                                href={`mailto:${presentation.author.contact}`}
                                className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#9a731b]"
                            >
                                <Mail size={14} />
                                {presentation.author.contact}
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays size={16} />
                            {presentation.publishedAt.toLocaleDateString('en-CA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <FileText size={16} />
                            {presentation.pageCount} slides
                        </span>
                        <a
                            href={presentation.src}
                            download
                            className="inline-flex items-center gap-2 border border-[#0b1f38] bg-[#0b1f38] px-4 py-2.5 font-semibold text-white transition hover:border-[#9a731b] hover:bg-[#9a731b]"
                        >
                            <Download size={16} />
                            Download PDF
                        </a>
                    </div>
                </div>

                <div className="pt-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a731b]">
                                Full presentation
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                                Read the research
                            </h2>
                        </div>
                    </div>
                    <PDFPreview
                        fileUrl={presentation.src}
                        title={`${presentation.title} presentation`}
                    />
                </div>
            </section>
        </main>
    );
}
