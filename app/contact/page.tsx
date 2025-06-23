import ContactBg from '@/public/contact.jpg';

const Contact = () => {
    return (
        <div
            className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
            style={{ backgroundImage: `url(${ContactBg.src})` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-20 max-w-screen-xl w-full mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-6xl pb-4 font-bold">Contact Us</h1>
                    <p className="mt-4 text-xl">
                        We would love to hear from you!
                        <br />
                        Please reach out with any questions or feedback.
                    </p>
                </div>

                <div className="lg:w-1/2">
                    <form
                        action="https://formspree.io/f/meogwbdk"
                        method="POST"
                        className="backdrop-blur-md bg-black/40 w-full mt-10 p-8 rounded-xl shadow-lg text-white"
                    >
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"  
                                className="w-full bg-transparent border-b border-white placeholder-gray-300 text-white p-2 focus:outline-none focus:border-blue-400"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"  
                                className="w-full bg-transparent border-b border-white placeholder-gray-300 text-white p-2 focus:outline-none focus:border-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                            <textarea
                                id="message"
                                name="message"  
                                rows={4}
                                className="w-full bg-transparent border-b border-white placeholder-gray-300 text-white p-2 focus:outline-none focus:border-blue-400"
                                placeholder="Type your message..."
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-3 rounded transition-all duration-200 ease-in
    hover:bg-black hover:text-white active:scale-90"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Contact;
