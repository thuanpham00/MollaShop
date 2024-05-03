import { keepPreviousData, useQuery } from "@tanstack/react-query"
import AsideFilter from "./components/AsideFilter"
import Product from "./components/Product/Product"
import SortProductList from "./components/SortProductList"
import { productApi } from "src/apis/products.api"
import { ProductListConfig } from "src/types/product.type"
import Pagination from "src/Components/Pagination"
import { Fragment } from "react/jsx-runtime"
import { categoriesApi } from "src/apis/categories"
import useQueryConfig from "src/Hooks/useQueryConfig"
import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"

export default function ProductList() {
  const { darkMode } = useContext(AppContext)
  const queryConfig = useQueryConfig() // lấy tham số truy vấn
  //console.log(queryConfig)

  // bản chất của nó:
  /**
   * Lấy các tham số truy vấn từ URL - queryConfig
   * truyền queryConfig vào productList fetch lại data
   */

  /**
   * Và khi click vào các sort hay filter thì nó điều hướng trang (navigate) => ...queryConfig, name:
   * và nó thêm param vào name
   */

  /**
   * và nó tiếp tục lấy các tham số từ URL xuống
   * productList fetch lại data
   */
  // cơ chế hoạt động

  const getProductListQuery = useQuery({
    queryKey: ["productList", queryConfig], // định danh
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    }, // api (url) nhận vào params và params truyền xuống - lấy ra và fetch lại data theo yêu cầu
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000 // dưới 5 phút nó không gọi lại api
  })

  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoriesApi.getCategories()
    }
  })

  const data = getProductListQuery.data?.data.data

  const handleStartScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`${darkMode ? "bg-[#000] text-gray-200" : "bg-[#fff]"} py-6 duration-200`}>
      <div className="container">
        <div className="grid grid-cols-12">
          {data && (
            <Fragment>
              <div className="col-span-2">
                <AsideFilter
                  queryConfig={queryConfig}
                  categories={getCategoriesQuery.data?.data.data || []}
                />
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

                <Pagination
                  scroll={handleStartScroll}
                  queryConfig={queryConfig}
                  page_size={data.pagination.page_size}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
