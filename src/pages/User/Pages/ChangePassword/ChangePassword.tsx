import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"

// import { omit } from "lodash"
import omit from "lodash/omit" /// giảm kích thước file

import { useContext } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { Fragment } from "react/jsx-runtime"
import Button from "src/Components/Button"
import Input from "src/Components/Input"
import userApi, { BodyUpdateProfile } from "src/apis/user.api"
import { AppContext } from "src/contexts/auth.context"
import { ErrorResponse } from "src/types/utils.type"
import { UserSchemaType, userSchema } from "src/utils/rules"
import { NoUndefinedField, isError422 } from "src/utils/utils"
import { ObjectSchema } from "yup"

const passwordSchema = userSchema.pick(["password", "new_password", "confirm_password"])

type FormData = NoUndefinedField<
  Pick<UserSchemaType, "password" | "new_password" | "confirm_password">
>

export default function ChangePassword() {
  const { t } = useTranslation("profile")
  const { darkMode } = useContext(AppContext)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(passwordSchema as ObjectSchema<FormData>),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: ""
    }
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => {
      return userApi.updateProfile(body)
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ["confirm_password"])) // gửi lên chỉ có pass cũ và pass mới
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isError422<ErrorResponse<FormData>>(error)) {
        // trường hợp mật khẩu không đúng
        const formData = error.response?.data.data
        if (formData?.password) {
          setError("password", {
            message: formData.password
          })
        }
      }
    }
  })

  return (
    <Fragment>
      <Helmet>
        <title>Thay đổi mật khẩu</title>
        <meta name="description" content="Thay đổi mật khẩu | E-commerce shop" />
      </Helmet>

      <div className="border-b border-b-gray-200 pb-6">
        <h1
          className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold capitalize`}
        >
          {t("profile.title")}
        </h1>
        <span className="text-sm"> {t("profile.desc")}</span>
      </div>

      <form onSubmit={onSubmit} className="mt-6 mr-auto max-w-2xl">
        <div className="flex-grow mt-6 md:mt-0 pr-12">
          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">{t("changePass.password")}</div>
            <div className="w-[80%] sm:pl-5">
              <Input
                className="relative"
                classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                register={register}
                name="password"
                type="password"
                placeholder={t("changePass.password")}
                messageInputError={errors.password?.message}
              />
            </div>
          </div>

          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">
              {t("changePass.newPassword")}
            </div>
            <div className="w-[80%] sm:pl-5">
              <Input
                className="relative"
                classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                register={register}
                name="new_password"
                type="password"
                placeholder={t("changePass.newPassword")}
                messageInputError={errors.new_password?.message}
              />
            </div>
          </div>

          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right">
              {t("changePass.confirmPassword")}
            </div>
            <div className="w-[80%] sm:pl-5">
              <Input
                className="relative"
                classNameInput="w-full px-3 py-2 border border-gray-200 outline-none text-black text-sm font-normal"
                register={register}
                name="confirm_password"
                type="password"
                placeholder={t("changePass.confirmPassword")}
                messageInputError={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right"></div>
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                type="submit"
                className="mt-0"
                classInput="px-5 h-9 flex items-center bg-primaryOrange text-white text-sm rounded-sm hover:bg-primaryOrange/80 duration-200"
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}
