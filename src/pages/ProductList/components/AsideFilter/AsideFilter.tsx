import { Link, createSearchParams, useNavigate } from "react-router-dom"
import Button from "src/Components/Button"
import { path } from "src/constants/path"
import { Categories } from "src/types/categories.type"
import classNames from "classnames"
import { Controller, useForm } from "react-hook-form"
import InputNumber from "src/Components/InputNumber"
import { SchemaType, schema } from "src/utils/rules"
import { yupResolver } from "@hookform/resolvers/yup"
import RatingStar from "../RatingStar"
import { queryParamConfig } from "src/Hooks/useQueryConfig"
// import { omit } from "lodash"
import omit from "lodash/omit" // giảm kích thước file
import { useTranslation } from "react-i18next"

interface Props {
  categories: Categories[]
  queryConfig: queryParamConfig
}

type FormData = Pick<SchemaType, "price_max" | "price_min">

const schemaPick = schema.pick(["price_max", "price_min"])

export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  const { t } = useTranslation(["productList", "header"]) // sử i18next ngôn ngữ

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger
  } = useForm<FormData>({
    resolver: yupResolver(schemaPick),
    defaultValues: {
      price_max: "",
      price_min: ""
    },
    shouldFocusError: true // tự động focus
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.productList,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleDeleteConfig = () => {
    navigate({
      pathname: path.productList,
      search: createSearchParams(
        omit(queryConfig, ["price_max", "price_min", "category", "rating_filter"])
      ).toString()
    })
    // omit giúp loại bỏ giá trị
    // queryConfig giữ lại các config cần
  }

  return (
    <div className="mt-3">
      <Link
        to={path.productList}
        className={classNames(
          "flex items-center gap-x-2 text-gray-500 duration-200 capitalize font-semibold text-md",
          {
            "text-primaryOrange": !category
          }
        )}
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
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        {t("asideFilter.allCategories")}
        {/* truyền key vào */}
      </Link>

      <ul className="mt-5">
        {categories.map((item) => {
          const isActive = category === item._id
          return (
            <li className="py-2 px-5" key={item._id}>
              <Link
                to={{
                  pathname: path.productList,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
                className={classNames("relative font-medium", {
                  "text-primaryOrange": isActive,
                  "text-gray-500": !isActive
                })}
              >
                {isActive && (
                  <svg
                    viewBox="0 0 4 7"
                    className="h-2 w-2 fill-current absolute top-1 left-[-12px]"
                  >
                    <polygon points="4 3.5 0 0 0 7"></polygon>
                  </svg>
                )}
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="flex items-center gap-x-2 mt-10">
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        <div className="capitalize font-semibold text-md">{t("asideFilter.filterSearch")}</div>
      </div>

      <div className="mt-5">
        <span>{t("asideFilter.priceRange")}</span>

        <form onSubmit={onSubmit} className="mt-2">
          <div className="flex items-center">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    placeholder="đ Từ"
                    autoComplete="on"
                    classNameInput="p-1 text-sm w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    className="grow"
                    onChange={(event) => {
                      field.onChange(event)
                      trigger("price_max")
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />

            {/* <InputV2
              control={control}
              name="price_min"
              type="number"
              placeholder="đ Từ"
              autoComplete="on"
              classNameInput="p-1 text-sm w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
              className="grow"
              onChange={() => {
                trigger("price_max")
              }}
            /> */}

            <div className="flex flex-shrink-0 mx-2 mt-3">-</div>

            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <InputNumber
                    type="text"
                    className="grow"
                    placeholder="đ ĐẾN"
                    classNameInput="p-1 text-sm w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger("price_min") // form validate lại
                    }}
                  />
                )
              }}
            />
          </div>

          <div className="mt-1 text-red-500 min-h-[1.25rem] text-sm text-center">
            {errors.price_min?.message}
          </div>

          <Button classInput="flex items-center justify-center w-full bg-primaryOrange text-white py-3 px-2 uppercase hover:bg-primaryOrange/80 duration-300 text-sm">
            {t("asideFilter.apply")}
          </Button>
        </form>
      </div>

      <div className="mt-10 mb-4">
        <span className="flex items-center gap-x-2 hover:text-gray-500 duration-200 uppercase font-semibold text-md">
          {t("asideFilter.rating")}
        </span>

        <RatingStar queryConfig={queryConfig} />
      </div>

      <Button
        onClick={handleDeleteConfig}
        classInput="flex items-center justify-center w-full bg-primaryOrange text-white py-3 px-2 uppercase hover:bg-primaryOrange/80 duration-300 text-sm"
      >
        {t("asideFilter.delete")}
      </Button>
    </div>
  )
}
