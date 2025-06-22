'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/app/ui/Logo';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Articles', path: '/articles' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const linkClasses = 'relative text-sm after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-sky-500 hover:after:w-full';

    return (
        <nav className="bg-black text-white p-4 pr-6">
            <div className="flex items-center justify-between">
                <Link href="/"><Logo /></Link>

                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.path} className={linkClasses}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {isOpen && (
                <ul className="md:hidden mt-4 space-y-3 px-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className="text-sm hover:underline"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default NavBar;
