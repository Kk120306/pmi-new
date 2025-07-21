import { IoPricetagsOutline } from 'react-icons/io5';
import Recent1 from "@/public/recent1.jpg";
import Recent2 from "@/public/recent2.jpg";
import Recent3 from "@/public/recent3.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/lib/queries';

const images = [Recent1, Recent2, Recent3];

const Articles = async () => {

    const articles = await getAllArticles();

    return (
        <div className="min-h-screen px-6 py-10 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-white text-gray-900 mt-20">            <div className="mb-12 flex flex-col md:flex-row md:items-start md:space-x-10 px-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 md:mb-0 md:w-1/3 text-left">
                All Articles
            </h1>
            <p className="text-base sm:text-lg text-gray-600 md:w-2/3 text-left">
                Discover powerful insights, expert strategies, and proven methods to grow your business,
                boost productivity, and stay ahead of the curve. Dive into our collection of articles
                written to inform, inspire, and ignite action.
            </p>
        </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mt-20 mb-20">
                {articles.map((article: any, index: number) => (
                    <div key={article.slug || index} className="flex flex-col bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6">
                        <div className="flex items-center gap-2 text-sky-600 font-semibold mb-2">
                            <IoPricetagsOutline />
                            <span>{article.tags[0]}</span>
                        </div>

                        <Image
                            src={images[index]}
                            alt={`Recent article ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{new Date(article.publishedAt).toDateString()}</p>
                        <p className="text-gray-700 flex-grow">{article.summary}</p>

                        <Link
                            href={`/articles/${article.slug}`}
                            className="mt-4 text-sky-600 hover:text-sky-800 font-medium transition duration-200"
                        >
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;
