import { Link, createSearchParams } from "react-router-dom"
import classNames from "classnames"
import { path } from "src/constants/path"
import { queryParamConfig } from "src/Hooks/useQueryConfig"

interface Props {
  queryConfig: queryParamConfig
  page_size: number
}

const range = 2

export default function Pagination({ queryConfig, page_size }: Props) {
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
        if (page <= range * 2 + 1 && pageNumber > page + range && pageNumber < page_size - range + 1) {
          return renderDotAfter(index)
        } else if (page > range * 2 + 1 && page < page_size - range * 2) {
          if (pageNumber < page - range && pageNumber > range) {
            return renderDotBefore(index)
          } else if (pageNumber > page + range && pageNumber < page_size - range + 1) {
            return renderDotAfter(index)
          }
        } else if (pageNumber < page - range && pageNumber > range && page >= page_size - range * 2) {
          return renderDotBefore(index)
        }
        return (
          <Link
            key={index}
            to={{
              pathname: path.productList,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames("py-2 px-3 flex items-center justify-center hover:bg-red-300", {
              "bg-red-500": isActive,
              "bg-gray-200": !isActive
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {page === 1 ? (
        <span className="cursor-not-allowed py-2 px-3 bg-gray-200 rounded-sm hover:bg-gray-300 duration-100">Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className="py-2 px-3 bg-gray-200 rounded-sm hover:bg-gray-300 duration-100"
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === page_size ? (
        <span className="cursor-not-allowed py-2 px-3 bg-gray-200 rounded-sm hover:bg-gray-300 duration-100">Next</span>
      ) : (
        <Link
          to={{
            pathname: path.productList,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className="py-2 px-3 bg-gray-100 rounded-sm hover:bg-gray-300 duration-100"
        >
          Next
        </Link>
      )}
    </div>
  )
}
