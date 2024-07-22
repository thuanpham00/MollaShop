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
import { Helmet } from "react-helmet-async"

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
      const controller = new AbortController()
      setTimeout(() => {
        controller.abort() // hủy request khi chờ quá lâu // 10 giây sau cho nó hủy // làm tự động
      }, 10000)
      return productApi.getProductList(queryConfig as ProductListConfig, controller.signal)
    }, // api (url) nhận vào params và params truyền xuống - lấy ra và fetch lại data theo yêu cầu
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // dưới 5 phút nó không gọi lại api
    retry: 0 // số lần retry lại khi hủy request (dùng abort signal)
  })

  const data = getProductListQuery.data?.data.data
  console.log(data)
  const getCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoriesApi.getCategories()
    }
  })

  const handleStartScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345] text-gray-200" : "bg-[#fff]"} py-6 duration-200`}
    >
      <Helmet>
        <title>Danh sách sản phẩm</title>
        <meta name="description" content="Danh sách sản phẩm - E-commerce shop" />
      </Helmet>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {data && (
            <Fragment>
              <div className="md:col-span-2">
                <AsideFilter
                  className="hidden md:block md:mt-3"
                  queryConfig={queryConfig}
                  categories={getCategoriesQuery.data?.data.data || []}
                />
              </div>

              <div className="hidden md:block w-[1px] h-[1000px] bg-gray-200 ml-[40px] rounded-md shadow-md"></div>

              <div className="col-span-1 md:col-span-9 md:col-start-4">
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
