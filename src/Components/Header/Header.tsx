import { Link, createSearchParams, useNavigate } from "react-router-dom"
import Popover from "../Popover"
import { path } from "src/constants/path"
import { loginApi } from "src/apis/login.api"
import { useContext } from "react"
import { AppContext } from "src/contexts/auth.context"
import { useMutation } from "@tanstack/react-query"
import avatar from "../../img/minhthuan.jpg"
import logo from "../../img/Black Simple Clothing Brand Logo.png"
import useQueryConfig from "src/Hooks/useQueryConfig"
import { useForm } from "react-hook-form"
import { SchemaType, schema } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import { omit } from "lodash"

type FormData = Pick<SchemaType, "name">
const nameSchema = schema.pick(["name"])

export default function Header() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  //console.log(queryConfig)

  const { handleSubmit, register } = useForm<FormData>({
    resolver: yupResolver(nameSchema), // validate
    defaultValues: {
      name: ""
    }
  })

  const { isAuthenticated, setIsAuthenticated, isProfile, setIsProfile } = useContext(AppContext)

  const logoutAccountMutation = useMutation({
    mutationFn: () => {
      return loginApi.logoutAccount()
    },
    onSuccess: () => {
      setIsAuthenticated(false)
      setIsProfile(null)
    }
  })

  const handleLogout = () => {
    logoutAccountMutation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ["order", "sort_by"]
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.productList,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <header>
      <div className="bg-[#f2f2f2]">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            <div className="text-grayText text-base sm hidden md:block lg:block">
              <span className="font-normal">24/7 Customer service</span>
              <span className="ml-2 font-medium">931-554-657</span>
            </div>

            <div className="flex items-center gap-x-6">
              <Popover
                className="flex items-center gap-x-1 py-1 text-grayText text-base hover:text-grayText/70 cursor-pointer"
                renderPopover={
                  <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                    <div className="flex flex-col">
                      <button className="px-8 py-3 hover:text-orange-600 hover:bg-slate-200">Tiếng việt</button>
                      <button className="px-8 py-3 hover:text-orange-600 hover:bg-slate-200 mt-2">Tiếng anh</button>
                    </div>
                  </div>
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <span>Tiếng việt</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Popover>

              {isAuthenticated && (
                <Popover
                  className="flex items-center gap-x-1 py-1 text-grayText text-base hover:text-grayText/70 cursor-pointer"
                  renderPopover={
                    <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                      <div className="flex flex-col">
                        <Link to={path.profile} className="p-3 hover:text-orange-600 hover:bg-slate-200">
                          Tài khoản của tôi
                        </Link>
                        <Link to={path.home} className="p-3 hover:text-orange-600 hover:bg-slate-200">
                          Đơn mua
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="p-3 hover:text-orange-600 hover:bg-slate-200 text-left"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  }
                >
                  {" "}
                  <div className="w-5 h-5">
                    <img src={avatar} alt="" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <span className="font-normal">{isProfile?.email}</span>
                </Popover>
              )}

              {!isAuthenticated && (
                <div className="flex items-center gap-x-4">
                  <Link to={path.register} className="text-grayText text-base hover:text-grayText/80 cursor-pointer">
                    Đăng ký
                  </Link>
                  <Link to={path.login} className="text-grayText text-base hover:text-grayText/80 cursor-pointer">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fff]">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 py-4 items-center">
            <Link to="/" className="col-span-2">
              <img src={logo} className="object-cover w-full h-[49px]" alt="logo" />
            </Link>

            <form onSubmit={onSubmitSearch} className="col-span-8 col-start-4 shadow-sm">
              <div className="bg-white p-1 flex items-center round-sm border border-gray-400">
                <input
                  type="text"
                  placeholder="Search product..."
                  className="flex-grow outline-none p-2 text-base"
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

            <div className="col-span-1 justify-self-end ">
              <Popover
                renderPopover={
                  <div className="mt-1 w-[400px] bg-white p-5 shadow-md rounded-sm">
                    <span className="text-gray-500 text-base font-semibold">Sản phẩm mới thêm</span>

                    <div className="mt-5">
                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>

                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>

                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>

                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>

                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>

                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img
                            src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj5dxqxpr28c83_tn"
                            alt="Ảnh"
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            Băng đô rửa mặt bờm cute cài tóc dễ thương chống trơn trượt, lông mềm mại phong cách Hàn
                            Quốc trẻ em, người lớn
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-red-500">$469.000đ</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Thêm vào giỏ hàng</span>
                      <button className="p-3 bg-red-500 hover:bg-red/80 duration-300 text-white">Xem giỏ hàng</button>
                    </div>
                  </div>
                }
              >
                <Link to="/" className="w-11 h-11 bg-primaryOrange flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </Link>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primaryOrange">
        <div className="container">
          <div className="flex items-center justify-center py-2 flex-wrap gap-x-20">
            <Link to={path.home}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Home
              </span>
            </Link>
            <Link to={path.productList}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                All products
              </span>
            </Link>
            <Link to={`${`/productList?page=1&limit=15&sort_by=view&category=60afacca6ef5b902180aacaf`}`}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Đồng hồ
              </span>
            </Link>
            <Link to={`${`/productList?page=1&limit=15&category=60aba4e24efcc70f8892e1c6&sort_by=view`}`}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Áo thun
              </span>
            </Link>
            <Link to={`${`/productList?page=1&limit=15&category=60afafe76ef5b902180aacb5&sort_by=view`}`}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Điện thoại
              </span>
            </Link>
            <Link to={path.productList}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Điện thoại và Phụ kiện
              </span>
            </Link>
            <Link to={path.productList}>
              <span className="text-base text-white font-medium hover:text-white/70 d-font-medium-300 capitalize">
                Khuyến mãi
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
