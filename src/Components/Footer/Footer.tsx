import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { AppContext } from "src/contexts/auth.context"

export default function Footer() {
  const { darkMode } = useContext(AppContext)
  const { t } = useTranslation("footer")
  return (
    <footer>
      <div
        className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} duration-200 border-t border-gray-500`}
      >
        <div className="container">
          <div className="pt-10 pb-8 lg:flex lg:items-start lg:justify-between gap-4">
            <Link to="/" className="lg:flex-1 mt-2 md:mt-5">
              <div className="flex items-center w-full lg:w-full text-[28px] md:text-3xl lg:text-4xl">
                <div className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} font_logo`}>
                  Molla
                </div>
              </div>
            </Link>

            <div className="lg:flex-1 mt-5">
              <h3
                className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} text-xl md:text-2xl font-semibold`}
              >
                Shop
              </h3>
              <ul className="mt-2 md:mt-5">
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("shop.hotDeal")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("shop.categories")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("shop.brands")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("shop.rebates")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("shop.weeklyDeal")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:flex-1 mt-5">
              <h3
                className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} text-xl md:text-2xl font-semibold`}
              >
                {t("needHelps.title")}
              </h3>
              <ul className="mt-2 md:mt-5">
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("needHelps.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("needHelps.orderTracking")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("needHelps.FAQS")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("needHelps.returnPolicy")}
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    {t("needHelps.privacyPolicy")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:flex-1 mt-5">
              <h3
                className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} text-xl md:text-2xl font-semibold`}
              >
                {t("needHelps.contact")}
              </h3>
              <ul className="mt-2 md:mt-5">
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    23/46 NHT, Tan Phu, Ho Chi Minh city
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    phamminhthuan912@gmail.com
                  </Link>
                </li>
                <li>
                  <Link
                    to=""
                    className={`${darkMode ? "text-[#f2f2f2]" : "text-[#27232f]"} mb-2 block text-xs md:text-base`}
                  >
                    +84-931-554-657
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primaryGray">
        <div className="container">
          <div className="py-5 md:py-10 flex items-center justify-between flex-wrap gap-4">
            <span className="text-[#9ca7ab]">@2024 Molla Store. Power by Molla Store</span>

            <div className="flex items-center gap-x-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#9ca7ab"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#9ca7ab"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#9ca7ab"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
