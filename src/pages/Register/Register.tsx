import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Button from "src/Components/Button"
import Input from "src/Components/Input"
import { loginApi } from "src/apis/login.api"
import { path } from "src/constants/path"
import { ErrorResponse } from "src/types/utils.type"
import { SchemaType, schema } from "src/utils/rules"
import { isError422 } from "src/utils/utils"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/contexts/auth.context"
import image1 from "src/img/shoppingBG.jpg"
import image2 from "src/img/image_register.jpg"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"

const imageList = [image1, image2]

type FormData = Pick<SchemaType, "email" | "password" | "confirm_password"> // giữ nguyên 3 type

type FormDataOmitConfirmPass = Pick<SchemaType, "email" | "password">

const schemaPick = schema.pick(["email", "password", "confirm_password"])

export default function Register() {
  const { t } = useTranslation("header")
  const { darkMode } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    formState: { errors },
    register,
    //watch,
    handleSubmit,
    setError
  } = useForm<FormData>({ resolver: yupResolver(schemaPick) }) // truyền schema vào định dạng form

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormDataOmitConfirmPass) => {
      return loginApi.registerAccount(body) // truyền kiểu body vào là gồm email và password
    }
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: () => {
        navigate(path.login) // đăng kí xong chuyển tới trang đăng nhập
      },
      onError: (error) => {
        console.log(error) // lỗi 422 xuất hiện khi đăng ký 1 tài khoản 2 lần
        if (isError422<ErrorResponse<FormDataOmitConfirmPass>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "server"
            })
          }
          if (formError?.password) {
            setError("password", {
              message: formError.password,
              type: "server"
            })
          }
        }
      } // khi nó bắt được lỗi 422 thì nó setError lại và thay đổi errors từ formState hiện lên message
    })
  })

  //const watchForm = watch()
  //console.log(watchForm)

  //console.log(errors)

  const [imageItem, setImageItem] = useState<string>(imageList[0])

  useEffect(() => {
    const interval = setInterval(() => {
      imageList.map((item) => {
        setImageItem(item)
      })
      if (imageItem === imageList[1]) {
        setImageItem(imageList[0])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [imageItem])

  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-slate-200"} `}
    >
      <Helmet>
        <title>Đăng ký</title>
        <meta name="description" content="Đăng ký - E-commerce shop" />
      </Helmet>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:pr-10 gap-2">
          <div className="hidden lg:block lg:col-span-3 ml-14">
            <img
              src={imageItem}
              alt="ảnh"
              className="rounded-sm shadow-md object-cover w-[600px] h-[470px]"
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white py-10 px-8 rounded shadow-md">
              <h1 className="text-primaryGray text-3xl font-normal">{t("header.register")}</h1>
              <form onSubmit={onSubmit} noValidate className="mt-5">
                <Input
                  className="mt-8"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="on"
                  messageInputError={errors.email?.message}
                  register={register}
                />
                <Input
                  className="mt-2 relative"
                  classNameEye="w-5 h-5 absolute top-[12px] right-[10px] cursor-pointer"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="on"
                  messageInputError={errors.password?.message}
                  register={register}
                />
                <Input
                  className="mt-2 relative"
                  classNameEye="w-5 h-5 absolute top-[12px] right-[10px] cursor-pointer"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  autoComplete="on"
                  messageInputError={errors.confirm_password?.message}
                  register={register}
                />
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={registerAccountMutation.isPending}
                  isPending={registerAccountMutation.isPending}
                >
                  {t("header.register")}
                </Button>
              </form>
              <div className="flex justify-center mt-5">
                <span className="text-gray-500">{t("header.descRegister")}</span>
                <Link to={path.login} className="ml-1 text-red-500">
                  {t("header.login")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
