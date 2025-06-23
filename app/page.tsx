import HomeBg from "@/public/home-bg.jpg";
import NewestArticle from "@/app/ui/home/NewestArticle";

export default function Home() {
    return (
        <div className="text-white mb-10">

            <div
                className="relative h-[89vh] md:h-[93vh] bg-cover bg-center flex items-end md:p-12 p-7 lg:p-15 pb-0 justify-between gap-5 md:parallax-bg"
                style={{ backgroundImage: `url(${HomeBg.src})` }}  
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="z-10">
                    <h1 className="text-2xl md:text-5xl font-bold text-left ">
                        Global Insights<br />
                        Strategic Growth
                    </h1>
                    <p className="text-xs md:text-sm mt-4 pb-10">
                        We deliver in-depth case studies and market analysis on global businesses. <br />
                        Our articles offer clear, actionable insights into company strategy and growth.
                    </p>
                </div>
            </div>


            <div className="md:p-12 p-7 lg:p-15 text-black mt-20 flex flex-col items-center justify-center gap-8 md:gap-20">
                <NewestArticle />
                <div className="w-full md:px-8 lg:px-12">
                    <img
                        // src={HomeSBg}
                        alt="Home Section Background"
                        className="w-full max-w-6xl mx-auto max-h-[200px] md:max-h-[300px] lg:max-h-[400px] object-cover"
                    />
                </div>
                {/* <RecentArticles /> */}
            </div>


        </div>
    );
}
