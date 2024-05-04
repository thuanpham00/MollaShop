import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { SchemaType, schema } from "src/utils/rules"
import useQueryConfig from "./useQueryConfig"
import { createSearchParams, useNavigate } from "react-router-dom"
import { path } from "src/constants/path"
import { omit } from "lodash"

type FormData = Pick<SchemaType, "name">
const nameSchema = schema.pick(["name"])

export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  // console.log(queryConfig);
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm<FormData>({
    resolver: yupResolver(nameSchema), // validate
    defaultValues: {
      name: ""
    }
  })

  const onSubmitSearch = handleSubmit((data) => {
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
    onSubmitSearch,
    register
  }
}
