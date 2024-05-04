import { useContext } from "react"
import NavHeader from "../NavHeader"
import { AppContext } from "src/contexts/auth.context"
import { Link } from "react-router-dom"
import useSearchProduct from "src/Hooks/useSearchProduct"

export default function CartHeader() {
  const { darkMode } = useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProduct() // destructoring

  return (
    <div>
      <NavHeader />

      <div className={`${darkMode ? "bg-[#000]" : "bg-white"} duration-200`}>
        <div className="container">
          <div className="py-4 flex flex-wrap items-center justify-between gap-4 md:grid md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-4">
              <div className="flex items-center">
                <Link to="/">
                  <div
                    className={`flex w-full lg:w-full text-[28px] md:text-3xl lg:text-5xl ${darkMode ? "text-[#f8edeb]" : "text-[#403d39]"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`${darkMode ? "#f8edeb" : "#403d39"}`}
                      className="w-7 h-7 md:w-13 md:h-13 lg:w-11 lg:h-11"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <div className="font_logo">Molla</div>
                  </div>
                </Link>
                <h1
                  className={`${darkMode ? "text-[#f8edeb]" : "text-[#403d39]"} ml-5 text-lg md:text-2xl lg:text-3xl font_logo border-l-2 border-l-gray-500 pl-5`}
                >
                  Giỏ hàng
                </h1>
              </div>
            </div>

            <form
              onSubmit={onSubmitSearch}
              className="md:col-start-7 md:col-span-6 lg:col-start-7 lg:col-span-6 shadow-sm"
            >
              <div className="w-[420px] md:w-full bg-white p-1 flex items-center round-sm border border-gray-400">
                <input
                  type="text"
                  placeholder="Search product..."
                  className="w-full md:flex-grow outline-none p-2 text-base"
                  {...register("name")}
                />
                <div className="flex-shrink-0 pr-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
