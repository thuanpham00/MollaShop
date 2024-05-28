import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"
import Popover from "../Popover"
import { Link } from "react-router-dom"
import { path } from "src/constants/path"
import { loginApi } from "src/apis/login.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { purchaseStatus } from "src/constants/purchaseStatus"
import { getAvatarUrl, getNameFromeEmail } from "src/utils/utils"
import { locales } from "src/i18n/i18n"
import { useTranslation } from "react-i18next"

export default function NavHeader() {
  const { i18n, t } = useTranslation("header") // sử dụng đổi ngôn ngữ
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const queryClient = useQueryClient()
  const {
    isAuthenticated,
    setIsAuthenticated,
    isProfile,
    setIsProfile,
    darkMode,
    setDarkMode,
    setLanguage
  } = useContext(AppContext)

  const logoutAccountMutation = useMutation({
    mutationFn: () => {
      return loginApi.logoutAccount()
    },
    onSuccess: () => {
      setIsAuthenticated(false)
      setIsProfile(null)
      queryClient.removeQueries({ queryKey: ["purchaseList", { status: purchaseStatus.inCart }] }) // clear data query
    }
  })

  const handleLogout = () => {
    logoutAccountMutation.mutate()
  }

  const toggleLight = () => {
    setDarkMode(false)
  }

  const toggleDark = () => {
    setDarkMode(true)
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  return (
    <div className="bg-primaryColor">
      <div className="container">
        <div className="flex items-center justify-end lg:justify-between py-1">
          <div className="text-[#f2f2f2]/90 text-base hidden lg:block">
            <span className="text-xs md:text-base font-normal">{t("header.customerService")}</span>
            <span className="text-xs md:text-base ml-2 font-medium">931-554-657</span>
          </div>

          <div className="flex items-center gap-x-6">
            <Popover
              className={
                "text-[#f2f2f2]/90 hover:text-[#f2f2f2]/70 flex items-center gap-x-1 py-1 text-base cursor-pointer"
              }
              renderPopover={
                <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                  <div className="flex flex-col">
                    <button
                      onClick={toggleLight}
                      className="text-sm md:text-base flex items-center justify-between px-5 py-3 hover:text-orange-600 hover:bg-slate-200"
                    >
                      {t("header.modeLight")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={toggleDark}
                      className="text-sm md:text-base flex items-center justify-start gap-5 px-5 py-3 hover:text-orange-600 hover:bg-slate-200 mt-2"
                    >
                      {t("header.modeDark")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <span className="text-xs md:text-base">{darkMode ? "Tối" : "Sáng"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </Popover>

            <Popover
              className="text-[#f2f2f2]/90 hover:text-[#f2f2f2]/70 hidden md:flex items-center gap-x-1 py-1 text-base cursor-pointer"
              renderPopover={
                <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                  <div className="flex flex-col">
                    <button
                      className="text-sm md:text-base px-8 py-3 hover:text-orange-600 hover:bg-slate-200"
                      onClick={() => changeLanguage("vi")}
                    >
                      Tiếng việt
                    </button>
                    <button
                      className="text-sm md:text-base px-8 py-3 hover:text-orange-600 hover:bg-slate-200 mt-2"
                      onClick={() => changeLanguage("en")}
                    >
                      English
                    </button>
                  </div>
                </div>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="text-sm md:text-base">{currentLanguage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </Popover>

            {isAuthenticated && (
              <Popover
                className={`${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-grayText hover:text-grayText/70"} flex items-center gap-x-1 py-1 text-base cursor-pointer`}
                renderPopover={
                  <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                    <div className="flex flex-col">
                      <Link
                        to={path.profile}
                        className="text-sm md:text-base p-3 hover:text-orange-600 hover:bg-slate-200"
                      >
                        {t("header.myAccount")}
                      </Link>
                      <Link
                        to={path.historyPurchase}
                        className="text-sm md:text-base p-3 hover:text-orange-600 hover:bg-slate-200"
                      >
                        {t("header.purchase")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-sm md:text-base p-3 hover:text-orange-600 hover:bg-slate-200 text-left"
                      >
                        {t("header.logout")}
                      </button>
                    </div>
                  </div>
                }
              >
                <div className="w-5 h-5">
                  <img
                    src={getAvatarUrl(isProfile?.avatar as string)}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[#f2f2f2]/90 hover:text-[#f2f2f2]/70 text-xs md:text-base font-medium font_name">
                  {getNameFromeEmail(isProfile?.email as string)}
                </span>
              </Popover>
            )}

            {!isAuthenticated && (
              <div className="flex items-center gap-x-4">
                <Link
                  to={path.register}
                  className="text-[#f2f2f2]/90 hover:text-[#f2f2f2]/70 text-base cursor-pointer"
                >
                  {t("header.register")}
                </Link>
                <Link
                  to={path.login}
                  className="text-[#f2f2f2]/90 hover:text-[#f2f2f2]/70 text-base cursor-pointer"
                >
                  {t("header.login")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
