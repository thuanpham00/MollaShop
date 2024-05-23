/* eslint-disable jsx-a11y/alt-text */
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Link, NavLink } from "react-router-dom"
import { path } from "src/constants/path"
import { AppContext } from "src/contexts/auth.context"
import { getAvatarUrl, getNameFromeEmail } from "src/utils/utils"

export default function UserSideNav() {
  const { t } = useTranslation("profile")
  const { darkMode, isProfile } = useContext(AppContext)
  return (
    <div>
      <div className="py-6 flex items-center gap-4 border-b border-b-gray-200">
        <Link to={path.profile} className="flex-shrink-0 w-14 h-14 overflow-hidden">
          <img
            src={getAvatarUrl(isProfile?.avatar as string)}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
        <div className="flex-grow">
          <div
            className={`${darkMode ? "text-white/80" : "text-gray-600"} mb-1 font-semibold truncate text-base`}
          >
            {getNameFromeEmail(isProfile?.email as string)}
          </div>
          <Link
            to={path.profile}
            className={`flex items-center gap-1 ${darkMode ? "text-white/80" : "text-gray-500"} capitalize text-base`}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            {t("userSideNav.editProfile")}
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            `flex items-center gap-2 capitalize ${isActive ? "text-primaryColor font-semibold" : "text-gray-500"}
         ${darkMode && !isActive ? "text-white/90" : ""}`
          }
        >
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          {t("userSideNav.myAccount")}
        </NavLink>

        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            `mt-3 flex items-center gap-2 capitalize ${isActive ? "text-primaryColor font-semibold" : "text-gray-500"}
         ${darkMode && !isActive ? "text-white/90" : ""}`
          }
        >
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
              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
            />
          </svg>
          {t("userSideNav.changePassword")}
        </NavLink>

        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            `mt-3 flex items-center gap-2 capitalize ${isActive ? "text-primaryColor font-semibold" : "text-gray-500"}
         ${darkMode && !isActive ? "text-white/90" : ""}`
          }
        >
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
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {t("userSideNav.historyPurchase")}
        </NavLink>
      </div>
    </div>
  )
}
