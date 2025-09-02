import { getAllAuthors } from "@/lib/queries"
import { FaLinkedinIn } from "react-icons/fa"

const About = async () => {
  const authors = await getAllAuthors()

  return (
    <div className="bg-black min-h-screen">
      {/* Header Section */}
      <div className="bg-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">Financial Insights Team</h1>

          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mb-8">
            With deep market expertise and proven analytical frameworks, our team delivers actionable financial
            intelligence that empowers informed decision-making in today's dynamic economic landscape.
          </p>

        </div>
      </div>

      <div className="bg-black px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {authors.map((author: any) => (
              <div key={author.id} className="group flex flex-col items-center text-center">
                <div className="mb-6">
                  <img
                    src={author.profileImage || "/placeholder.svg"}
                    alt={author.name}
                    className="w-32 h-32 lg:w-36 lg:h-36 object-cover rounded-full border-2 border-gray-800 group-hover:border-gray-600 transition-all duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{author.name}</h3>
                  <p className="text-base text-gray-400 font-medium">{author.role}</p>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-xs">{author.bio}</p>

                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${author.contact}`}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-200 border border-gray-700 px-3 py-1 rounded-full hover:border-gray-500"
                  >
                    Contact
                  </a>
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors duration-200 p-2 border border-gray-700 rounded-full hover:border-gray-500"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
