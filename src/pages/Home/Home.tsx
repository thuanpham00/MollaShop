import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import img1 from "src/img/banner4.png"
import img2 from "src/img/banner2.png"
import img3 from "src/img/banner3.png"
import slide1 from "src/img/slide1.jpg"
import slide2 from "src/img/slide2.jpg"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { Link } from "react-router-dom"
import { path } from "src/constants/path"
import { queryParamConfig } from "src/Hooks/useQueryConfig"
import { useQuery } from "@tanstack/react-query"
import { productApi } from "src/apis/products.api"
import { ProductListConfig } from "src/types/product.type"
import ProductItem from "./components/ProductItem"
import SlideListProduct from "./components/SideListProduct"
import ProductItem2 from "./components/ProductItem2"
// image product
import productItem1 from "src/img/productItem1.png"
import productItem2 from "src/img/productItem2.png"
import productItem3 from "src/img/productItem3.png"
import productItem4 from "src/img/productItem4.png"
import productItem5 from "src/img/productItem5.png"

const buttonImageList = {
  prevArrow: (
    <button className="ml-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button className="mr-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
}

const buttonSlideList = {
  prevArrow: (
    <button className="ml-3 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#14213d"
        className="w-5 h-5 lg:h-8 lg:w-8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button className="mr-3 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#14213d"
        className="w-5 h-5 lg:w-8 lg:h-8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  )
}

const slideImages = [slide1, slide2]

const imageList = [img1, img2, img3]

export type ProductFeatured = {
  img: string
  name: string
  sold: number
  price: number
  priceBeforeDiscount: number
}

const productFeatured: ProductFeatured[] = [
  {
    img: productItem1,
    name: "Điện thoại Apple Iphone 12 64GB - Hàng chính hãng VNA",
    sold: 482,
    price: 20990000,
    priceBeforeDiscount: 26990000
  },
  {
    img: productItem2,
    name: "Đồng Hồ Nam CRRJU CR8940 Dây Thép Cao Cấp",
    sold: 2400,
    price: 300000,
    priceBeforeDiscount: 450000
  },
  {
    img: productItem3,
    name: "Áo thun nam cổ tròn siêu đẹp- Áo phông nam với chất liệu thun lạnh cực kì mát mẻ",
    sold: 0,
    price: 106000,
    priceBeforeDiscount: 189000
  },
  {
    img: productItem4,
    name: "Điện Thoại Xiaomi Redmi 9A 2GB/32GB - Hàng Chính Hãng",
    sold: 1000,
    price: 1949000,
    priceBeforeDiscount: 1990000
  },
  {
    img: productItem5,
    name: "Áo thun nam nữ cotton co giãn unisex Giisel phông trơn basic tee tay lỡ oversize form rộng 10 màu",
    sold: 523,
    price: 98350,
    priceBeforeDiscount: 189000
  }
]

export default function Home() {
  const { darkMode } = useContext(AppContext)

  const [scrollYPosition, setScrollYPosition] = useState<number>(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    setScrollYPosition(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [modeAnimation, setModeAnimation] = useState<boolean>(true)
  useEffect(() => {
    if (scrollYPosition < 600) {
      setModeAnimation(true)
    } else {
      setModeAnimation(false)
    }
  }, [scrollYPosition]) // khi nào scrollYPosition thay đổi tham chiếu nó chạy lại hàm này

  const queryConfigCreatedAt: queryParamConfig = {
    page: "1",
    limit: "8",
    sort_by: "createdAt"
  }
  const getProductListCreatedAtQuery = useQuery({
    queryKey: ["productListHome", queryConfigCreatedAt],
    queryFn: () => {
      return productApi.getProductList(queryConfigCreatedAt as ProductListConfig)
    }
  })

  const queryConfigSold: queryParamConfig = {
    page: "1",
    limit: "8",
    sort_by: "sold"
  }
  const getProductListSoldQuery = useQuery({
    queryKey: ["productListHome", queryConfigSold],
    queryFn: () => {
      return productApi.getProductList(queryConfigSold as ProductListConfig)
    }
  })

  const productListCreatedAt = getProductListCreatedAtQuery.data?.data.data.products
  const productListSold = getProductListSoldQuery.data?.data.data.products

  const productListViewItem_one = productFeatured.slice(0, 1)
  const productListViewItem_four = productFeatured.slice(1, 5)

  if (!productListCreatedAt) return null
  if (!productListSold) return null
  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} duration-200`}
    >
      <div className="w-full relative">
        <Slide {...buttonSlideList}>
          {slideImages.map((item, index) => {
            return (
              <div className="w-full h-[350px] md:h-[550px] lg:h-[750px]" key={index}>
                <div
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                  className="w-full h-full"
                ></div>
              </div>
            )
          })}
        </Slide>

        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-[30%]">
          <div
            className={`${modeAnimation ? "animation" : ""} flex justify-center items-center flex-col`}
          >
            <h1 className="font_logo text-3xl md:text-8xl text-[#403d30]">Molla</h1>
            <h2 className="tracking-wider font_logo capitalize mt-0 md:mt-4 block text-black text-2xl md:text-5xl">
              New Fashion
            </h2>
            <h3 className="text-xs md:text-xl text-gray-600 mt-0 md:mt-4 text-center">
              Your style evolution starts here: Fashion, watches, and smartphones
            </h3>
            <Link
              to={path.productList}
              className="text-xs md:text-base tracking-widest uppercase mt-4 py-2 px-3 md:py-5 md:px-6 bg-primaryOrange hover:bg-primaryOrange/80 duration-200 rounded-sm shadow-sm text-white"
            >
              Shop now!
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={`${darkMode ? "bg-[#252323] border-gray-500" : "bg-[#fff]"} mt-5 w-full duration-200 pt-2 md:pt-5 pb-2 md:pb-8 px-3 z-10 shadow-sm border`}
        >
          <div className="grid grid-cols-12 gap-4 flex-wrap">
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    Miễn phí vận chuyển
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Khi bạn mua từ 2tr trở lên
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 lg:border-r-2 lg:border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    Chúng tôi luôn sẵn sàng 24/7
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Cần giúp đỡ? Liên hệ với chúng tôi bất cứ lúc nào
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 border-r-2 border-gray-300 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    Hài lòng hoặc quay trở lại
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Chính sách hoàn trả 30 ngày dễ dàng
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-6 lg:col-span-3 md:p-2">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#0573f0"
                    className="w-4 h-4 md:w-8 md:h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <span
                    className={`${darkMode ? "text-white" : "text-black"} font-semibold text-xs md:text-lg md:line-clamp-1`}
                  >
                    Thanh toán an toàn 100%
                  </span>
                  <span className="block font-light text-[10px] md:text-sm text-gray-500">
                    Visa, Mastercard, Stripe, PayPal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-8 p-4">
          <div className="flex items-center gap-4">
            <h2
              className={`flex-shrink-0 uppercase text-xl md:text-3xl font-semibold ${darkMode ? "text-[#fff]/80" : "text-[#000]"} text-left -tracking-normal`}
            >
              Sản phẩm phổ biến
            </h2>
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid md:grid-cols-12 items-center gap-2 md:gap-4">
            <div className="col-span-6">
              {productListViewItem_one?.map((item, index) => (
                <div key={index}>
                  <ProductItem2 item={item} />
                </div>
              ))}
            </div>
            <div className="col-span-6">
              <div className="grid grid-cols-6 gap-2 md:gap-4">
                {productListViewItem_four.map((item, index) => (
                  <div className="col-span-3" key={index}>
                    <ProductItem2
                      item={item}
                      className="h-[220px] md:h-[300px] bg-[#f9f9f9] flex flex-col pt-8 items-center rounded-sm shadow-sm px-4 py-2"
                      classNameImage="h-[80px] md:h-[150px] object-cover"
                      classNameTitle="mt-2 mr-auto font-medium text-sm line-clamp-2 h-[40px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-8 p-4">
          <Slide {...buttonImageList}>
            {imageList.map((item, index) => (
              <div className="each-slide-effect rounded-md" key={index}>
                <div
                  style={{
                    backgroundImage: `url(${item})`,
                    borderRadius: "6px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "350px"
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>

        <SlideListProduct
          title="Sản phẩm mới nhất"
          desc="Những sản phẩm mới nhất trong tuần này"
          timeScroll={3000}
        >
          {productListCreatedAt.map((item, index) => (
            <div key={index} className="flex-1 max-w-[150px] md:max-w-[290px]">
              <ProductItem item={item} />
            </div>
          ))}
        </SlideListProduct>

        <SlideListProduct
          title="Sản phẩm bán chạy"
          desc="Những sản phẩm bán chạy nhất trong tuần này"
          timeScroll={2000}
        >
          {productListSold.map((item, index) => (
            <div key={index} className="flex-1 max-w-[150px] md:max-w-[290px]">
              <ProductItem item={item} />
            </div>
          ))}
        </SlideListProduct>
      </div>
    </div>
  )
}
