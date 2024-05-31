import { Link } from "react-router-dom"
import Popover from "../Popover"
import { path } from "src/constants/path"
import { Fragment, useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import { useQuery } from "@tanstack/react-query"
import { purchaseApi } from "src/apis/purchase.api"
import { purchaseStatus } from "src/constants/purchaseStatus"
import { formatCurrency, getAvatarUrl, getNameFromeEmail } from "src/utils/utils"
import cartImg from "src/img/cart.png"
import NavHeader from "../NavHeader"
import useSearchProduct from "src/Hooks/useSearchProduct"
import { Purchase } from "src/types/purchase.type"
import { useTranslation } from "react-i18next"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
  // eslint-disable-next-line import/no-unresolved
} from "@/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
  // eslint-disable-next-line import/no-unresolved
} from "@/ui/dialog"

const MAX_PURCHASES = 5

export default function Header() {
  const { t } = useTranslation(["header", "cart"])
  const { isAuthenticated, darkMode, isProfile } = useContext(AppContext)

  const { onSubmitSearch_desktop, onSubmitSearch_mobile, registerLarge, registerSmall } =
    useSearchProduct() // destructuring

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

      <header className={`${activeNav ? "" : "sticky top-0 left-0 z-20"} shadow-lg`}>
        <div
          className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} duration-200 border-b border-gray-300`}
        >
          <div className="container">
            {/* header_mobile */}
            <div className="flex items-center justify-between md:hidden gap-4 py-2">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`${darkMode ? "#f1f1f1" : "#1f1f1f"}`}
                      className="h-9 w-9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <Link to={path.profile} className="mt-5 flex items-center gap-2">
                        <div className="w-10 h-10">
                          <img
                            src={getAvatarUrl(isProfile?.avatar as string)}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                          <span className="text-primaryColor text-sm md:text-xl font-semibold font_name">
                            {getNameFromeEmail(isProfile?.email as string)}
                          </span>
                          <span className="text-primaryColor text-xs md:text-lg font-medium font_name">
                            {isProfile?.name}
                          </span>
                        </div>
                      </Link>
                      <div>
                        <Link
                          to={path.home}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className={`textbasee font-semibold capitalize`}>
                            {t("header.headerList.home")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                        <Link
                          to={path.productList}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className="text-base font-semibold capitalize">
                            {t("header.headerList.productList")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                        <Link
                          to={path.productList}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className="text-base font-semibold capitalize">
                            {t("header.headerList.new")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                        <Link
                          to={`${`/productList?page=1&limit=15&sort_by=view&category=60afacca6ef5b902180aacaf`}`}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className="text-base font-semibold capitalize">
                            {t("header.headerList.watch")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                        <Link
                          to={`${`/productList?page=1&limit=15&category=60aba4e24efcc70f8892e1c6&sort_by=view`}`}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className="text-base font-semibold capitalize">
                            {t("header.headerList.clothes")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                        <Link
                          to={`${`/productList?page=1&limit=15&category=60afafe76ef5b902180aacb5&sort_by=view`}`}
                          className={`py-2 flex items-center justify-between w-[80px] gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                        >
                          <span className="text-base font-semibold capitalize">
                            {t("header.headerList.phone")}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Link>
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>

              <div
                className={`font_logo ${darkMode ? "text-[#f2f2f2]" : "text-primaryColor"} ml-6 text-4xl`}
              >
                Molla
              </div>

              <div className="flex items-center">
                <Link
                  to={path.cart}
                  className="w-12 h-12 flex items-center justify-center rounded-sm relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={`${darkMode ? "white" : "black"}`}
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {(purchasesInCart as Purchase[])?.length > 0 && (
                    <span className="w-4 h-4 md:h-5 md:w-6 text-white bg-primaryColor rounded-full absolute top-1 md:top-0 right-0 md:-right-2 text-[12px] flex items-center justify-center">
                      {purchasesInCart?.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <form
              autoComplete="off"
              onSubmit={onSubmitSearch_mobile}
              className="w-full md:hidden py-2"
            >
              <div className="w-full bg-[#f1f1f1] p-1 flex items-center rounded-full">
                <input
                  type="text"
                  placeholder={t("header.search")}
                  className="w-full md:flex-grow outline-none py-2 px-3 text-sm md:text-base bg-transparent"
                  {...registerSmall("name")}
                />
                <div className="flex-shrink-0 pr-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-6 md:h-6"
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

            {/* header_desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-4 items-center">
              <div className="col-span-2 flex items-center gap-2">
                <Sheet>
                  <SheetTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`${darkMode ? "#f1f1f1" : "#1f1f1f"}`}
                      className="h-12 w-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <div className="mt-10 flex items-start gap-4">
                        <div className="w-28 h-28">
                          <img
                            src={getAvatarUrl(isProfile?.avatar as string)}
                            alt=""
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-start">
                          <span className="mt-5 text-primaryColor text-xs md:text-xl font-semibold font_name">
                            {getNameFromeEmail(isProfile?.email as string) || "Email user"}
                          </span>
                          <span className="text-primaryColor text-xs md:text-lg font-medium font_name">
                            {isProfile?.name || "Name user"}
                          </span>
                        </div>
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Dialog>
                  <DialogTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={`${darkMode ? "#f1f1f1" : "#1f1f1f"}`}
                      className="w-4 h-4 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <form
                        onSubmit={onSubmitSearch_desktop}
                        className="md:mt-5 hidden md:block md:w-full"
                      >
                        <div className="w-[180px] md:w-full bg-[#f1f1f1] p-1 flex items-center rounded-full">
                          <input
                            type="text"
                            placeholder={t("header.search")}
                            className="w-full md:flex-grow outline-none py-2 px-3 text-sm md:text-base bg-transparent"
                            {...registerLarge("name")}
                          />
                          <div className="flex-shrink-0 pr-2 cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 md:w-6 md:h-6"
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
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="ml-6 col-span-8 rounded-md">
                <div className="flex items-center justify-center gap-4">
                  <Link
                    to={path.home}
                    className={`flex items-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className={`text-sm md:text-base font-semibold capitalize`}>
                      {t("header.headerList.home")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={path.productList}
                    className={`flex items-center justify-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className="text-sm md:text-base font-semibold capitalize">
                      {t("header.headerList.productList")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={path.productList}
                    className={`flex items-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className="text-sm md:text-base font-semibold capitalize">
                      {t("header.headerList.new")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                  <div
                    className={`font_logo ${darkMode ? "text-[#f2f2f2]" : "text-primaryColor"} text-[28px] md:text-3xl lg:text-5xl`}
                  >
                    Molla
                  </div>
                  <Link
                    to={`${`/productList?page=1&limit=15&sort_by=view&category=60afacca6ef5b902180aacaf`}`}
                    className={`flex items-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className="text-sm md:text-base font-semibold capitalize">
                      {t("header.headerList.watch")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={`${`/productList?page=1&limit=15&category=60aba4e24efcc70f8892e1c6&sort_by=view`}`}
                    className={`flex items-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className="text-sm md:text-base font-semibold capitalize">
                      {t("header.headerList.clothes")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={`${`/productList?page=1&limit=15&category=60afafe76ef5b902180aacb5&sort_by=view`}`}
                    className={`flex items-center gap-1 ${darkMode ? "text-[#f2f2f2] hover:text-[#f2f2f2]/70" : "text-primaryColor hover:text-primaryColor/70"}`}
                  >
                    <span className="text-sm md:text-base font-semibold capitalize">
                      {t("header.headerList.phone")}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="col-span-2 justify-self-end">
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
                      className="w-8 h-8 md:w-11 md:h-11"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {(purchasesInCart as Purchase[])?.length > 0 && (
                      <span className="w-4 h-4 md:h-5 md:w-6 text-white bg-primaryColor rounded-full absolute top-1 md:top-0 right-0 md:-right-2 text-[12px] flex items-center justify-center">
                        {purchasesInCart?.length}
                      </span>
                    )}
                  </Link>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}
