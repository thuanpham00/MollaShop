import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { path } from "src/constants/path"
import { sortBy } from "src/constants/product"
import { ProductListConfig } from "src/types/product.type"
import classNames from "classnames"

// import { omit } from "lodash"
import omit from "lodash/omit"

import { queryParamConfig } from "src/Hooks/useQueryConfig"
import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"
import { useTranslation } from "react-i18next"
import AsideFilter from "../AsideFilter"
import { useQuery } from "@tanstack/react-query"
import { categoriesApi } from "src/apis/categories"
interface Props {
  queryConfig: queryParamConfig
  page_size: number
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
  // eslint-disable-next-line import/no-unresolved
} from "@/ui/sheet"

export default function SortProductList({ queryConfig, page_size }: Props) {
  const { t } = useTranslation("productList")
  const { darkMode } = useContext(AppContext)
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.view, order } = queryConfig

  const navigate = useNavigate()
  const isActiveSort = (sortByValue: Exclude<ProductListConfig["sort_by"], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig["sort_by"], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ["order"] // loại bỏ config order
        )
      ).toString()
    }) // ...queryConfig có nghĩa là khi fetch data thì nó sẽ lưu lại các param đang sẵn có (clone lại hết)
    // vì sao sử dụng hook navigate thay vì thẻ Link
    // vì sử dụng function xử lý js nên dùng hook để điều hướng tốt hơn
    // dựa trên ngữ cảnh
  }

  const handleOrderPrice = (orderValue: Exclude<ProductListConfig["order"], undefined>) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoriesApi.getCategories()
    }
  })

  return (
    <div className={`${darkMode ? "bg-[#252323]" : "bg-gray-100"} py-4 px-2`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <span className="hidden md:block md:text-base">{t("sortByProduct.desc")}</span>
          <button
            className={classNames("p-[6px] md:px-4 md:h-[40px] text-xs md:text-base rounded-sm", {
              "bg-primaryColor text-white": isActiveSort(sortBy.view),
              border: !isActiveSort(sortBy.view),
              "border-black text-black": !darkMode && !isActiveSort(sortBy.view),
              "border-white text-white": darkMode && !isActiveSort(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            {t("sortByProduct.view")}
          </button>
          <button
            className={classNames("p-[6px] md:px-4 md:h-[40px] text-xs md:text-base rounded-sm", {
              "bg-primaryColor text-white": isActiveSort(sortBy.createdAt),
              border: !isActiveSort(sortBy.createdAt),
              "border-black text-black": !darkMode && !isActiveSort(sortBy.createdAt),
              "border-white text-white": darkMode && !isActiveSort(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {t("sortByProduct.createdAt")}
          </button>
          <button
            className={classNames("p-[6px] md:px-4 md:h-[40px] text-xs md:text-base rounded-sm", {
              "bg-primaryColor text-white": isActiveSort(sortBy.sold),
              border: !isActiveSort(sortBy.sold),
              "border-black text-black": !darkMode && !isActiveSort(sortBy.sold),
              "border-white text-white": darkMode && !isActiveSort(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            {t("sortByProduct.sold")}
          </button>
          <select
            className={classNames(
              "p-[6px] w-[60px] md:w-[170px] md:h-[40px] text-xs md:text-base rounded-sm outline-none",
              {
                "bg-primaryColor text-white": isActiveSort(sortBy.price),
                border: !isActiveSort(sortBy.price),
                "border-black text-black bg-transparent": !darkMode && !isActiveSort(sortBy.price),
                "border-white text-white bg-transparent": darkMode && !isActiveSort(sortBy.price)
              }
            )}
            value={order || ""}
            onChange={(event) =>
              handleOrderPrice(event.target.value as Exclude<ProductListConfig["order"], undefined>)
            }
          >
            <option
              value=""
              disabled
              className="bg-white text-black p-2 w-[60px] md:w-[100px] md:h-[40px]"
            >
              {t("sortByProduct.price")}
            </option>
            <option
              value="asc"
              className="bg-white text-black p-2 w-[60px] md:w-[100px] md:h-[40px]"
            >
              {t("sortByProduct.ascOrderby")}
            </option>
            <option
              value="desc"
              className="bg-white text-black p-2 w-[60px] md:w-[100px] md:h-[40px]"
            >
              {t("sortByProduct.descOrderby")}
            </option>
          </select>
        </div>

        <div className="hidden md:flex items-center justify-center gap-x-2">
          <div>
            <span>{page}</span>
            <span>/3</span>
          </div>
          <div className="flex items-center justify-center">
            {page === 1 ? (
              <div className="w-8 h-8 bg-white flex items-center justify-center shadow-sm border border-gray-300 hover:bg-gray-200 duration-300 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </div>
            ) : (
              <Link
                to={{
                  pathname: path.productList,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-300 hover:bg-gray-200 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </Link>
            )}

            {page === page_size ? (
              <div className="w-8 h-8 bg-white flex items-center justify-center shadow-sm border border-gray-300 hover:bg-gray-200 duration-300 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            ) : (
              <Link
                to={{
                  pathname: path.productList,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className="w-8 h-8 bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-300 hover:bg-gray-200 duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="gray"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* filter_search mobile */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="flex items-center gap-[2px] md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                  />
                </svg>
                <span>Lọc</span>
              </div>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <AsideFilter
                  className="mt-3"
                  queryConfig={queryConfig}
                  categories={getCategoriesQuery.data?.data.data || []}
                />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
