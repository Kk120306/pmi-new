'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BookOpenText,
    ChevronDown,
    Menu,
    PanelsTopLeft,
    X,
} from 'lucide-react';
import Logo from '@/app/ui/Logo';

const primaryItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const researchItems = [
    {
        name: 'Articles',
        description: 'Written analysis and reports',
        path: '/articles',
        icon: BookOpenText,
    },
    {
        name: 'Decks',
        description: 'Presentation-led equity research',
        path: '/decks',
        icon: PanelsTopLeft,
    },
];

const NavBar = () => {
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLLIElement>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isResearchOpen, setIsResearchOpen] = useState(false);
    const [isMobileResearchOpen, setIsMobileResearchOpen] = useState(false);

    const isResearchActive = researchItems.some(({ path }) =>
        pathname.startsWith(path),
    );

    useEffect(() => {
        setIsMobileOpen(false);
        setIsResearchOpen(false);
        setIsMobileResearchOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setIsResearchOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsResearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const linkClasses = (isActive: boolean) =>
        `relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
            isActive ? 'text-white' : 'text-zinc-300 hover:text-white'
        } after:absolute after:bottom-0 after:left-0 after:h-px after:bg-sky-400 after:transition-[width] after:duration-200 ${
            isActive
                ? 'after:w-full'
                : 'after:w-0 hover:after:w-full focus-visible:after:w-full'
        }`;

    return (
        <nav className="relative z-50 border-b border-white/10 bg-black px-4 py-3 text-white sm:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <Link
                    href="/"
                    aria-label="Pacific Market Insights home"
                    className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                    <Logo />
                </Link>

                <button
                    type="button"
                    className="rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 md:hidden"
                    onClick={() => setIsMobileOpen((open) => !open)}
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className="hidden items-center gap-7 md:flex">
                    <li>
                        <Link
                            href="/"
                            className={linkClasses(pathname === '/')}
                        >
                            Home
                        </Link>
                    </li>

                    <li
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsResearchOpen(true)}
                        onMouseLeave={() => setIsResearchOpen(false)}
                    >
                        <button
                            type="button"
                            className={`${linkClasses(isResearchActive)} flex items-center gap-1.5`}
                            onClick={() => setIsResearchOpen((open) => !open)}
                            aria-expanded={isResearchOpen}
                            aria-haspopup="menu"
                            aria-controls="research-navigation"
                        >
                            Research
                            <ChevronDown
                                size={15}
                                className={`transition-transform duration-200 ${
                                    isResearchOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        <div
                            id="research-navigation"
                            className={`absolute right-1/2 top-full w-80 translate-x-1/2 pt-4 transition duration-150 ${
                                isResearchOpen
                                    ? 'visible translate-y-0 opacity-100'
                                    : 'invisible -translate-y-1 opacity-0'
                            }`}
                        >
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-black/50">
                                <p className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                                    Explore our work
                                </p>
                                <ul role="menu" className="space-y-1">
                                    {researchItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname.startsWith(item.path);

                                        return (
                                            <li key={item.name} role="none">
                                                <Link
                                                    href={item.path}
                                                    role="menuitem"
                                                    onClick={() =>
                                                        setIsResearchOpen(false)
                                                    }
                                                    className={`group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-sky-400 ${
                                                        isActive
                                                            ? 'bg-white/10'
                                                            : 'hover:bg-white/[0.07]'
                                                    }`}
                                                >
                                                    <span
                                                        className={`mt-0.5 rounded-md border p-2 transition-colors ${
                                                            isActive
                                                                ? 'border-sky-400/40 bg-sky-400/10 text-sky-300'
                                                                : 'border-white/10 bg-white/5 text-zinc-400 group-hover:text-white'
                                                        }`}
                                                    >
                                                        <Icon size={17} />
                                                    </span>
                                                    <span>
                                                        <span className="block text-sm font-semibold text-white">
                                                            {item.name}
                                                        </span>
                                                        <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                                                            {item.description}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </li>

                    {primaryItems.slice(1).map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className={linkClasses(pathname.startsWith(item.path))}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {isMobileOpen && (
                <div
                    id="mobile-navigation"
                    className="mx-auto mt-3 max-w-7xl border-t border-white/10 px-1 pb-2 pt-3 md:hidden"
                >
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/"
                                onClick={() => setIsMobileOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/[0.07]"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-200 hover:bg-white/[0.07]"
                                onClick={() =>
                                    setIsMobileResearchOpen((open) => !open)
                                }
                                aria-expanded={isMobileResearchOpen}
                                aria-controls="mobile-research-navigation"
                            >
                                Research
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        isMobileResearchOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {isMobileResearchOpen && (
                                <ul
                                    id="mobile-research-navigation"
                                    className="ml-3 space-y-1 border-l border-white/10 py-1 pl-3"
                                >
                                    {researchItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.path}
                                                    onClick={() =>
                                                        setIsMobileOpen(false)
                                                    }
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.07] hover:text-white"
                                                >
                                                    <Icon size={16} />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                        {primaryItems.slice(1).map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.path}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/[0.07]"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
