import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { path } from "src/constants/path"
import { sortBy } from "src/constants/product"
import { ProductListConfig } from "src/types/product.type"
import classNames from "classnames"
import { omit } from "lodash"
import { queryParamConfig } from "src/Hooks/useQueryConfig"
interface Props {
  queryConfig: queryParamConfig
  page_size: number
}

export default function SortProductList({ queryConfig, page_size }: Props) {
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

  return (
    <div className="bg-gray-100 py-4 px-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <span>Sắp xếp theo</span>
          <button
            className={classNames("px-4 py-2 rounded-sm", {
              "bg-primaryOrange text-white": isActiveSort(sortBy.view),
              "border border-black text-black": !isActiveSort(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("px-4 py-2 rounded-sm", {
              "bg-primaryOrange text-white": isActiveSort(sortBy.createdAt),
              "border border-black text-black": !isActiveSort(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("px-4 py-2 rounded-sm", {
              "bg-primaryOrange text-white": isActiveSort(sortBy.sold),
              "border border-black text-black": !isActiveSort(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames("px-4 py-2 rounded-sm outline-none", {
              "bg-primaryOrange text-white": isActiveSort(sortBy.price),
              "border border-black text-black": !isActiveSort(sortBy.price)
            })}
            value={order || ""}
            onChange={(event) => handleOrderPrice(event.target.value as Exclude<ProductListConfig["order"], undefined>)}
          >
            <option value="" disabled className="bg-white text-black">
              Giá
            </option>
            <option value="asc" className="bg-white text-black">
              Giá: thấp đến cao
            </option>
            <option value="desc" className="bg-white text-black">
              Giá: cao đến thấp
            </option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-x-2">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
