// import { isUndefined, omitBy } from "lodash"
import isUndefined from "lodash/isUndefined" // giảm kích thước file
import omitBy from "lodash/omitBy" // giảm kích thước file

import { ProductListConfig } from "src/types/product.type"
import useQueryParams from "./useSearchParams"

export type queryParamConfig = {
  [key in keyof ProductListConfig]: string
} // lấy ra các key của ProductListConfig và gán lại bằng value "string"

export default function useQueryConfig() {
  const queryParams: queryParamConfig = useQueryParams() // lấy query params từ url truyền xuống rồi fetch data ra
  const queryConfig: queryParamConfig = omitBy(
    {
      page: queryParams.page || "1", // mặc định
      limit: queryParams.limit || "15", // mặc định - lấy từ url xuống
      sort_by: queryParams.sort_by || "view", // mặc định
      category: queryParams.category,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min
    },
    isUndefined // loại giá trị undefined ra
  )
  return queryConfig
}
