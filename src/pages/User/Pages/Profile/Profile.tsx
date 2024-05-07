import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Fragment } from "react/jsx-runtime"
import Button from "src/Components/Button"
import Input from "src/Components/Input"
import InputNumber from "src/Components/InputNumber"
import userApi from "src/apis/user.api"
import { AppContext } from "src/contexts/auth.context"
import avatar from "src/img/minhthuan.jpg"
import { UserSchemaType, userSchema } from "src/utils/rules"
import DateSelect from "../../Components/DateSelect"

type FormData = Pick<UserSchemaType, "name" | "address" | "avatar" | "phone" | "dateOfBirth">

const profileSchema = userSchema.pick(["name", "address", "avatar", "phone", "dateOfBirth"])

export default function Profile() {
  const { darkMode } = useContext(AppContext)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      dateOfBirth: new Date(1990, 0, 1) // 1/1/1990 -- tháng bắt đầu từ số 0 - tháng 1
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const getProfileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return userApi.getProfile()
    }
  })

  const profile = getProfileQuery.data?.data.data
  console.log(profile)

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name) // sau khi fetch data về thì useEffect data ra form = setValue
      setValue("address", profile.address)
      setValue("phone", profile.phone)
      setValue("avatar", profile.avatar)
      setValue("dateOfBirth", profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  return (
    <Fragment>
      <div className="border-b border-b-gray-200 pb-6">
        <h1
          className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold capitalize`}
        >
          Hồ sơ của tôi
        </h1>
        <span className="text-sm">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col-reverse md:flex-row md:items-start">
        <div className="flex-grow mt-6 md:mt-0 pr-12">
          <div className="flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">Email</div>
            <div className="w-[80%] sm:pl-5">
              <div className={`pt-3 ${darkMode ? "text-white" : "text-gray-700"}`}>
                {profile?.email}
              </div>
            </div>
          </div>
          <div className="sm:mt-6 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">Tên</div>
            <div className="w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                register={register}
                name="name"
                placeholder="Tên"
                messageInputError={errors.name?.message}
              />
            </div>
          </div>
          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">Số điện thoại</div>
            <div className="w-[80%] sm:pl-5">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => {
                  return (
                    <InputNumber
                      className="mb-6"
                      classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                      placeholder="Số điện thoại"
                      messageInputError={errors.phone?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )
                }}
              />
            </div>
          </div>
          
          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">Địa chỉ</div>
            <div className="w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                register={register}
                name="address"
                placeholder="Địa chỉ"
                messageInputError={errors.address?.message}
              />
            </div>
          </div>

          <DateSelect />

          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right"></div>
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                type="submit"
                className="mt-4"
                classInput="px-5 h-9 flex items-center bg-primaryOrange text-white text-sm rounded-sm hover:bg-primaryOrange/80 duration-200"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:w-72 md:border-l-2 md:border-l-gray-300">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img src={avatar} alt="avatar" className="object-cover w-full h-full rounded-full" />
            </div>
            <input className="hidden" type="file" accept=".jpg,.jpeg,.png" />
            <button
              type="button"
              className="px-5 py-2 border border-black-20 rounded-sm shadow hover:bg-gray-100 duration-200"
            >
              Chọn ảnh
            </button>
            <div className={`${darkMode ? "text-white/80" : "text-gray-500"} mt-3 text-left`}>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}
