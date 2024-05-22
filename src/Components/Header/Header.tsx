import { Link } from "react-router-dom"
import Popover from "../Popover"
import { path } from "src/constants/path"
import { Fragment, useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import { useQuery } from "@tanstack/react-query"
import { purchaseApi } from "src/apis/purchase.api"
import { purchaseStatus } from "src/constants/purchaseStatus"
import { formatCurrency } from "src/utils/utils"
import cartImg from "src/img/cart.png"
import NavHeader from "../NavHeader"
import useSearchProduct from "src/Hooks/useSearchProduct"
import { Purchase } from "src/types/purchase.type"
import { useTranslation } from "react-i18next"

const MAX_PURCHASES = 5

export default function Header() {
  const { t } = useTranslation(["header", "cart"])
  const { isAuthenticated, darkMode } = useContext(AppContext)

  const { onSubmitSearch, register } = useSearchProduct() // destructuring

  // khi chúng ta chuyển trang thì Header chỉ bị re-render
  // chứ không bị unmount - mounting again
  // (tất nhiên là trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
  // nên các query này sẽ ko bị inactive => ko bị gọi lại => ko cần thiết phải set stale: Infinity
  const getPurchaseListQuery = useQuery({
    queryKey: ["purchaseList", { status: purchaseStatus.inCart }],
    queryFn: () => {
      return purchaseApi.getPurchases({ status: purchaseStatus.inCart })
    },
    enabled: isAuthenticated // nó chỉ được chạy khi có isAuthenticated (true)
  })

  const purchasesInCart = getPurchaseListQuery.data?.data.data // chỉ chạy khi có isAuthenticated
  //console.log(purchasesInCart)

  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const handleScroll = () => {
    const scroll = window.scrollY
    setScrollPosition(scroll)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [activeNav, setActiveNav] = useState<boolean>(false)

  useEffect(() => {
    if (scrollPosition === 0) {
      setActiveNav(true)
    } else {
      setActiveNav(false)
    }
  }, [scrollPosition])

  return (
    <Fragment>
      <NavHeader />

      <div className={`${activeNav ? "" : "sticky top-0 left-0 z-20"}`}>
        <div
          className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-white"} duration-200`}
        >
          <div className="container">
            <div className="grid grid-cols-7 md:grid-cols-12 gap-4 py-2 items-center">
              <Link to="/" className="col-span-2 md:col-span-3 lg:col-span-2 rounded-md">
                <div className="flex items-center w-full lg:w-full text-[28px] md:text-3xl lg:text-5xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#667db6"
                    className="w-7 h-7 md:w-13 md:h-13 lg:w-10 lg:h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <div className="font_logo text-gradient">Molla</div>
                </div>
              </Link>

              <form
                onSubmit={onSubmitSearch}
                className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-4 shadow-sm"
              >
                <div className="w-[180px] md:w-full bg-white p-1 flex items-center round-sm border border-gray-400">
                  <input
                    type="text"
                    placeholder={t("header.search")}
                    className="w-full md:flex-grow outline-none p-1 md:p-2 text-base"
                    {...register("name")}
                  />
                  <div className="flex-shrink-0 pr-2 cursor-pointer">
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                </div>
              </form>

              <div className="col-span-1 col-start-7 md:col-start-12 justify-self-end">
                <Popover
                  renderPopover={
                    <div className="mt-1 w-[400px] bg-white p-5 shadow-md rounded-sm">
                      {purchasesInCart && purchasesInCart.length > 0 ? (
                        <Fragment>
                          <span className="text-gray-500 text-base font-semibold">
                            {t("header.cart.title")}
                          </span>

                          <div className="mt-5">
                            {purchasesInCart.slice(0, MAX_PURCHASES).map((item) => {
                              return (
                                <div className="mt-2 py-2 flex hover:bg-gray-200" key={item._id}>
                                  <div className="flex-shrink-0">
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="w-11 h-11 object-cover"
                                    />
                                  </div>
                                  <div className="ml-2 flex-grow overflow-hidden">
                                    <div className="truncate">{item.product.name}</div>
                                  </div>
                                  <div className="ml-2 flex-shrink-0">
                                    <span className="text-red-500">$</span>
                                    <span className="text-red-500">
                                      {formatCurrency(item.product.price)}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm">
                              {purchasesInCart.length > MAX_PURCHASES
                                ? purchasesInCart.length - MAX_PURCHASES
                                : ""}
                              {t("header.cart.add")}
                            </span>
                            <Link
                              to={path.cart}
                              className="p-3 bg-red-500 hover:bg-red/80 duration-300 text-white"
                            >
                              {t("header.cart.see")}
                            </Link>
                          </div>
                        </Fragment>
                      ) : (
                        <div className="p-2 flex items-center justify-center flex-col">
                          <img src={cartImg} alt="ảnh lỗi" className="w-[200px]" />
                          <h1>{t("cart:noProduct")}</h1>
                        </div>
                      )}
                    </div>
                  }
                >
                  <Link
                    to="/"
                    className="w-12 h-12 flex items-center justify-center rounded-sm relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`${darkMode ? "white" : "black"}`}
                      className="w-11 h-11"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {(purchasesInCart as Purchase[])?.length > 0 && (
                      <span className="h-5 w-6 text-white bg-primaryOrange rounded-full absolute top-0 -right-2 text-[12px] flex items-center justify-center">
                        {purchasesInCart?.length}
                      </span>
                    )}
                  </Link>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6]">
          <div className="container">
            <div className="flex items-center justify-center py-2 flex-wrap gap-x-4 md:gap-x-20">
              <Link to={path.home}>
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.home")}
                </span>
              </Link>
              <Link to={path.productList}>
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.productList")}
                </span>
              </Link>
              <Link
                to={`${`/productList?page=1&limit=15&sort_by=view&category=60afacca6ef5b902180aacaf`}`}
              >
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.watch")}
                </span>
              </Link>
              <Link
                to={`${`/productList?page=1&limit=15&category=60aba4e24efcc70f8892e1c6&sort_by=view`}`}
              >
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.clothes")}
                </span>
              </Link>
              <Link
                to={`${`/productList?page=1&limit=15&category=60afafe76ef5b902180aacb5&sort_by=view`}`}
              >
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.phone")}
                </span>
              </Link>
              <Link to={path.productList}>
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.phone2")}
                </span>
              </Link>
              <Link to={path.productList}>
                <span className="text-xs md:text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                  {t("header.headerList.deal")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
