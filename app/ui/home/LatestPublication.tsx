import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, FileText } from 'lucide-react';
import { findNewestPublication } from '@/lib/queries';

const LatestPublication = async () => {
    const publication = await findNewestPublication();

    if (!publication) {
        return null;
    }

    const publishDate = publication.publishedAt.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <section className="w-full max-w-6xl" aria-labelledby="latest-publication-heading">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/15 pb-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a731b]">
                        New research
                    </p>
                    <h2
                        id="latest-publication-heading"
                        className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl"
                    >
                        Latest publication
                    </h2>
                </div>
                <Link
                    href="/decks"
                    className="hidden text-sm font-semibold text-[#0b1f38] underline decoration-[#b8902f] decoration-2 underline-offset-4 sm:inline-flex"
                >
                    View all decks
                </Link>
            </div>

            <article className="grid overflow-hidden border border-black/10 bg-[#fffefa] shadow-[0_22px_60px_-42px_rgba(11,31,56,0.65)] md:grid-cols-[0.85fr_1.15fr]">
                <Link
                    href={`/decks/${publication.slug}`}
                    className="block bg-white"
                    aria-label={`Read ${publication.title}`}
                >
                    <Image
                        src={publication.imageUrl}
                        alt={`${publication.title} cover`}
                        width={1247}
                        height={935}
                        priority
                        className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-[1.015]"
                    />
                </Link>
                <div className="flex flex-col p-7 sm:p-9">
                    <div className="flex flex-wrap gap-2">
                        {publication.tags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-[#b8902f]/35 bg-[#b8902f]/[0.08] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#72530d]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                        {publication.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-7 text-slate-600">
                        {publication.summary}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-black/10 pt-5 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays size={16} />
                            Published {publishDate}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <FileText size={16} />
                            {publication.pageCount} pages
                        </span>
                    </div>
                    <Link
                        href={`/decks/${publication.slug}`}
                        className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#0b1f38] underline decoration-[#b8902f] decoration-2 underline-offset-4 transition hover:text-[#9a731b]"
                    >
                        Read the deck
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </article>
        </section>
    );
};

export default LatestPublication;
