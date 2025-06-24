import AboutBg from "@/public/about-bg.jpg";
import { getAllAuthors } from "@/lib/queries";
import { FaLinkedinIn } from "react-icons/fa";


const About = async () => {

    const authors = await getAllAuthors();

    return (
        <div>
            <div
                className="relative min-h-screen bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${AboutBg.src})` }}
            >
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                    <h1 className="text-5xl font-bold mb-6">Our Team</h1>
                    <p className="text-lg text-gray-300 mb-16 text-center max-w-3xl">
                        We're a passionate team focused on analyzing business strategy, growth, and innovation across global markets.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
                        {authors.map((author : any) => (
                            <div
                                key={author.id}
                                className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <img
                                    src={author.profileImage}
                                    alt={author.name}
                                    className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-white/10"
                                />
                                <h2 className="text-2xl font-semibold text-white text-center">{author.name}</h2>
                                <p className="text-sm text-gray-400 text-center mt-2">{author.role}</p>
                                <p className="text-sm text-gray-400 text-center mt-2">{author.bio}</p>
                                <p className="text-sm text-blue-300 text-center mt-4">
                                    <a href={`mailto:${author.contact}`} className="hover:underline">
                                        {author.contact}
                                    </a>
                                </p>
                                <div className="flex justify-center mt-4">
                                    <a
                                        href={author.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-blue-500 hover:scale-110 transition-colors duration-300"
                                    >
                                        <FaLinkedinIn size={15} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                    </div>
                </div>
            </div>
            <div className="bg-black py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        At <span className="text-white font-semibold">Pacific Market Insights</span>, we are dedicated to providing businesses with clear,
                        actionable insights to thrive in today’s dynamic markets. Our team of experienced analysts combines deep industry
                        knowledge with cutting-edge research methodologies to uncover opportunities and deliver data-driven solutions.
                        <br className="hidden md:block" /><br className="hidden md:block" />
                        Whether it’s navigating market challenges or identifying the next big trend, we are your trusted partner
                        in driving growth and success.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default About;
