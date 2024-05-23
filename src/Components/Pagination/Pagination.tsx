import { Link, createSearchParams } from "react-router-dom"
import classNames from "classnames"
import { path } from "src/constants/path"
import { queryParamConfig } from "src/Hooks/useQueryConfig"
import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"
import { useTranslation } from "react-i18next"

interface Props {
  queryConfig: queryParamConfig
  page_size: number
  scroll: () => void
}

const range = 2

export default function Pagination({ queryConfig, page_size, scroll }: Props) {
  const { t } = useTranslation("productList")
  const { darkMode } = useContext(AppContext)
  const page = Number(queryConfig.page) // lấy từ url xuống và url nhận vào các params
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = true

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className="hover:bg-slate-200 duration-300 bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
          >
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className="hover:bg-slate-200 duration-300 bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
          >
            ...
          </span>
        )
      }
      return null
    }

    return Array(page_size)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        const isActive = pageNumber === page
        if (
          page <= range * 2 + 1 &&
          pageNumber > page + range &&
          pageNumber < page_size - range + 1
        ) {
          return renderDotAfter(index)
        } else if (page > range * 2 + 1 && page < page_size - range * 2) {
          if (pageNumber < page - range && pageNumber > range) {
            return renderDotBefore(index)
          } else if (pageNumber > page + range && pageNumber < page_size - range + 1) {
            return renderDotAfter(index)
          }
        } else if (
          pageNumber < page - range &&
          pageNumber > range &&
          page >= page_size - range * 2
        ) {
          return renderDotBefore(index)
        }
        return (
          <Link
            onClick={scroll}
            key={index}
            to={{
              pathname: path.productList,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames(
              "text-xs md:test-base py-2 px-3 flex items-center justify-center border border-primaryColor hover:bg-red-300",
              {
                "bg-primaryColor": isActive,
                "bg-transparent": !isActive
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {page === 1 ? (
        <span
          className={`cursor-not-allowed text-xs md:test-base py-2 px-3 ${darkMode ? "bg-black/50 hover:bg-black/30" : "bg-gray-200 hover:bg-gray-300"} rounded-sm duration-200`}
        >
          {t("prev")}
        </span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className={`text-xs md:test-base py-2 px-3 ${darkMode ? "bg-black/50 hover:bg-black/30" : "bg-gray-200 hover:bg-gray-300"} rounded-sm duration-200`}
        >
          {t("prev")}
        </Link>
      )}

      {renderPagination()}

      {page === page_size ? (
        <span
          className={`cursor-not-allowed text-xs md:test-base py-2 px-3 ${darkMode ? "bg-black/50 hover:bg-black/30" : "bg-gray-200 hover:bg-gray-300"} rounded-sm duration-200`}
        >
          {t("next")}
        </span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className={`text-xs md:test-base py-2 px-3 ${darkMode ? "bg-black/50 hover:bg-black/30" : "bg-gray-200 hover:bg-gray-300"} rounded-sm duration-200`}
        >
          {t("next")}
        </Link>
      )}
    </div>
  )
}
