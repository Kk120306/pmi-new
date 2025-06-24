import { IoPricetagsOutline } from "react-icons/io5";
import Recent1 from "@/public/recent1.jpg";
import Recent2 from "@/public/recent2.jpg";
import Recent3 from "@/public/recent3.jpg";
import { getRecentArticles } from '@/lib/queries';
import Link from 'next/link';
import Image from "next/image";


const RecentArticles = async () => {
    const articles = await getRecentArticles();
    const images = [Recent1, Recent2, Recent3];

    if (articles.length === 0) return <p>No articles available.</p>;

    return (
        <div className="text-black max-w-6xl mx-auto mt-15">
            <h2 className="text-3xl md:text-5xl font-semibold mb-15 font-serif">Read More</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                {articles.map((article: any, index: number) => (
                    <div key={article.slug || index} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-sky-600 font-semibold">
                            <IoPricetagsOutline />
                            <span>{article.tags[0]}</span>
                        </div>
                        <Image
                            src={images[index]}
                            alt={`Recent article ${index + 1}`}
                            className="w-full h-48 sm:h-52 md:h-56 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold">{article.title}</h3>
                        <p className="text-sm text-gray-500">{new Date(article.publishedAt).toDateString()}</p>
                        <p className="text-gray-700">{article.summary}</p>
                        <Link
                            href={`/articles/${article.slug}`}
                            className="mt-auto text-sky-600 hover:text-black font-medium"
                        >
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentArticles;
