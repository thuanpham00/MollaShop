import { keepPreviousData, useQuery } from "@tanstack/react-query"
import AsideFilter from "./components/AsideFilter"
import Product from "./components/Product/Product"
import SortProductList from "./components/SortProductList"
import { productApi } from "src/apis/products.api"
import { ProductListConfig } from "src/types/product.type"
import useQueryParams from "src/Hooks/useSearchParams"
import Pagination from "src/Components/Pagination"
import { isUndefined, omitBy } from "lodash"
import { Fragment } from "react/jsx-runtime"
import { categoriesApi } from "src/apis/categories"

export type queryParamConfig = {
  [key in keyof ProductListConfig]: string
} // lấy ra các key của ProductListConfig và gán lại bằng value "string"

export default function ProductList() {
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
  //console.log(queryConfig)

  const getProductListQuery = useQuery({
    queryKey: ["productList", queryConfig], // định danh
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    }, // api (url) nhận vào params và params truyền xuống - lấy ra và fetch lại data theo yêu cầu
    placeholderData: keepPreviousData
  })

  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoriesApi.getCategories()
    }
  })

  const data = getProductListQuery.data?.data.data

  return (
    <div className="bg-[#fff] py-6">
      <div className="container">
        <div className="grid grid-cols-12">
          {data && (
            <Fragment>
              <div className="col-span-2">
                <AsideFilter queryConfig={queryConfig} categories={getCategoriesQuery.data?.data.data || []} />
              </div>

              <div className="w-[1px] h-[1000px] bg-gray-300 ml-[40px] rounded-md shadow-md"></div>

              <div className="col-span-9 col-start-4">
                <SortProductList queryConfig={queryConfig} page_size={data.pagination.page_size} />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-10">
                  {data.products.map((item, index) => (
                    <div className="col-span-1" key={index}>
                      <Product item={item} key={item._id} />
                    </div> // render item nhanh gọn lẹ
                  ))}
                </div>

                <Pagination queryConfig={queryConfig} page_size={data.pagination.page_size} />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
