import { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { AppContext } from "src/contexts/auth.context"

// khi đường dẫn url sai nó trỏ đến trang này

export default function NotFound() {
  const { darkMode } = useContext(AppContext)
  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} w-full px-16 md:px-0 h-[500px] flex items-center justify-center`}
    >
      <Helmet>
        <title>NotFound</title>
        <meta name="description" content="Không tìm thấy" />
      </Helmet>

      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-red-600">
          404
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-red-600 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="flex items-center space-x-2 bg-primaryColor hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}
