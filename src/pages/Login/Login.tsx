import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Button from "src/Components/Button"
import Input from "src/Components/Input"
import { loginApi } from "src/apis/login.api"
import { path } from "src/constants/path"
import { AppContext } from "src/contexts/auth.context"
import { ErrorResponse } from "src/types/utils.type"
import { SchemaType, schema } from "src/utils/rules"
import { isError422 } from "src/utils/utils"
import image1 from "src/img/shoppingBG.jpg"
import image2 from "src/img/image_register.jpg"

// type FormData = Omit<SchemaType, "confirm_password"> // không cần confirm_password
// // dùng Omit để loại bỏ bớt thuộc tính

// // omit dùng trong biến
// // Omit dùng trong type
// const schemaOmitConfirmData = schema.omit(["confirm_password"])

type FormData = Pick<SchemaType, "email" | "password">
const schemaPick = schema.pick(["email", "password"])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const imageList = [image1, image2]

export default function Login() {
  const { setIsAuthenticated, setIsProfile, darkMode } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    formState: { errors },
    setError,
    register,
    // watch,
    handleSubmit
  } = useForm<FormData>({ resolver: yupResolver(schemaPick) })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => {
      return loginApi.loginAccount(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        navigate(path.home) // đăng nhập xong chuyển tới trang chủ
        setIsAuthenticated(true)
        setIsProfile(data.data.data.user)
        // flow nó như thế này:
        // - đăng nhập xong -> nó set lại isAuthenticated = true ->
        // - nó set lại isAuthenticated = true và set lại isProfile
        // - truyền lên và lưu vào LS
        // console.log(data)
      },
      onError: (error) => {
        console.log(error) // lỗi 422 xuất hiện khi đăng nhập không đúng
        if (isError422<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError("email", {
              message: formError.email
            })
          }
          if (formError?.password) {
            setError("password", {
              message: formError.password
            })
          }
          console.log(formError?.password)
        }
      }
    })
  })

  //const watchForm = watch()
  //console.log(watchForm)

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
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-slate-200"}`}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:pr-10">
          <div className="hidden lg:block lg:col-span-3 ml-14">
            <img
              src={imageItem}
              alt="ảnh"
              className="rounded-sm shadow-md object-cover w-[550px] h-[470px]"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white py-10 px-8 rounded shadow-md">
              <h1 className="text-primaryGray text-3xl font-normal">Đăng nhập</h1>
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
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={loginAccountMutation.isPending}
                  isLoading={loginAccountMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </form>
              <div className="flex justify-center mt-5">
                <span className="text-gray-500">Bạn chưa có tài khoản?</span>
                <Link to={path.register} className="ml-1 text-red-500">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
