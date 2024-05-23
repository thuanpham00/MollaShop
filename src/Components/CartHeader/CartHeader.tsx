import { useContext } from "react"
import NavHeader from "../NavHeader"
import { AppContext } from "src/contexts/auth.context"
import { Link } from "react-router-dom"
import useSearchProduct from "src/Hooks/useSearchProduct"
import { useTranslation } from "react-i18next"

export default function CartHeader() {
  const { t } = useTranslation(["cart", "header"])
  const { darkMode } = useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProduct() // destructuring

  return (
    <div>
      <NavHeader />

      <div
        className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-white"} duration-200`}
      >
        <div className="container">
          <div className="py-2 flex flex-wrap items-center justify-between gap-4 md:grid md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-4">
              <div className="flex items-center">
                <Link to="/">
                  <div className="flex items-center w-full lg:w-full text-[28px] md:text-3xl lg:text-5xl">
                    <div
                      className={`font_logo ${darkMode ? "text-[#f2f2f2]" : "text-primaryColor"} text-[28px] md:text-3xl lg:text-5xl`}
                    >
                      Molla
                    </div>
                  </div>
                </Link>

                <h1
                  className={`${darkMode ? "text-[#f8edeb]" : "text-[#403d39]"} ml-5 text-lg md:text-2xl lg:text-3xl font_logo border-l-2 border-l-gray-500 pl-5`}
                >
                  {t("title")}
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
                  placeholder={t("header:header.search")}
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
