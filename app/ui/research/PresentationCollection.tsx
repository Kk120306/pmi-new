import Image from 'next/image';
import Link from 'next/link';
import { PresentationType } from '@prisma/client';
import { ArrowUpRight, FileText, UserRound } from 'lucide-react';
import { getPresentationsByType } from '@/lib/queries';

type PresentationCollectionProps = {
    type: PresentationType;
    eyebrow: string;
    title: string;
    introduction: string;
};

const routeByType: Record<PresentationType, string> = {
    DECK: '/decks',
    SLIDES: '/slides',
};

const PresentationCollection = async ({
    type,
    eyebrow,
    title,
    introduction,
}: PresentationCollectionProps) => {
    const presentations = await getPresentationsByType(type);
    const route = routeByType[type];

    return (
        <main className="min-h-screen bg-[#f2f0e9] text-[#101820]">
            <header className="relative overflow-hidden border-b border-white/10 bg-[#0b1f38] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_25%,rgba(203,161,53,0.19),transparent_31%),linear-gradient(115deg,transparent_55%,rgba(255,255,255,0.035)_55%,rgba(255,255,255,0.035)_56%,transparent_56%)]" />
                <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#dfb84d]">
                            {eyebrow}
                        </p>
                        <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                            {title}
                        </h1>
                    </div>
                    <p className="max-w-2xl border-l border-[#dfb84d]/60 pl-6 text-base leading-8 text-slate-300 sm:text-lg">
                        {introduction}
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                <div className="mb-10 flex items-end justify-between border-b border-black/15 pb-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a731b]">
                            Research library
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                            {presentations.length}{' '}
                            {presentations.length === 1 ? 'publication' : 'publications'}
                        </h2>
                    </div>
                </div>

                {presentations.length === 0 ? (
                    <div className="grid min-h-72 place-items-center border border-dashed border-black/25 bg-white/50 p-10 text-center">
                        <div className="max-w-md">
                            <FileText
                                size={30}
                                className="mx-auto mb-5 text-[#9a731b]"
                            />
                            <h3 className="text-xl font-semibold">
                                New research is in development
                            </h3>
                            <p className="mt-3 leading-7 text-slate-600">
                                Publications will appear here as soon as they are
                                ready for release.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-2">
                        {presentations.map((presentation) => (
                            <article
                                key={presentation.id}
                                className="group overflow-hidden border border-black/10 bg-[#fffefa] shadow-[0_22px_60px_-42px_rgba(11,31,56,0.65)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(11,31,56,0.7)]"
                            >
                                <Link
                                    href={`${route}/${presentation.slug}`}
                                    className="block overflow-hidden border-b border-black/10 bg-white"
                                >
                                    <Image
                                        src={presentation.imageUrl}
                                        alt={`${presentation.title} cover`}
                                        width={1247}
                                        height={935}
                                        priority={presentation.id === presentations[0]?.id}
                                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                                    />
                                </Link>
                                <div className="p-6 sm:p-8">
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {presentation.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="border border-[#b8902f]/35 bg-[#b8902f]/[0.08] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#72530d]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-3xl font-semibold tracking-[-0.025em]">
                                        {presentation.title}
                                    </h3>
                                    <p className="mt-4 leading-7 text-slate-600">
                                        {presentation.summary}
                                    </p>
                                    <div className="mt-7 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                                            <span className="flex items-center gap-2">
                                                <UserRound size={15} />
                                                {presentation.author.name}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <FileText size={15} />
                                                {presentation.pageCount} slides
                                            </span>
                                        </div>
                                        <Link
                                            href={`${route}/${presentation.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b1f38] underline decoration-[#b8902f] decoration-2 underline-offset-4 transition hover:text-[#9a731b]"
                                        >
                                            View research
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default PresentationCollection;
