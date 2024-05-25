import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { SchemaType, schema } from "src/utils/rules"
import useQueryConfig from "./useQueryConfig"
import { createSearchParams, useNavigate } from "react-router-dom"
import { path } from "src/constants/path"
// import { omit } from "lodash"
import omit from "lodash/omit" // giảm kích thước file

type FormData = Pick<SchemaType, "name">
const nameSchema = schema.pick(["name"])

export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  // console.log(queryConfig);
  const navigate = useNavigate()

  // 1 form cho desktop và 1 form cho mobile
  // vì 2 form sử dùng cùng 1 instance useForm sẽ gây xung đột dữ liệu ko submit được nên tách ra 2 instance khác nhau - tránh trùng lặp state
  // và lỗi - gọi hàm submit sai
  const { handleSubmit: handleSubmitLarge, register: registerLarge } = useForm<FormData>({
    resolver: yupResolver(nameSchema), // validate
    defaultValues: {
      name: ""
    }
  })

  const { handleSubmit: handleSubmitSmall, register: registerSmall } = useForm<FormData>({
    resolver: yupResolver(nameSchema), // validate
    defaultValues: {
      name: ""
    }
  })

  const onSubmitSearch_desktop = handleSubmitLarge((data) => {
    const config = queryConfig.order // nếu có order thì loại bỏ
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

  const onSubmitSearch_mobile = handleSubmitSmall((data) => {
    const config = queryConfig.order // nếu có order thì loại bỏ
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

  return {
    onSubmitSearch_desktop,
    onSubmitSearch_mobile,
    registerLarge,
    registerSmall
  }
}
