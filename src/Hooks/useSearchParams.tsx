import { useSearchParams } from "react-router-dom"

export default function useQueryParams() {
  const [searchParam] = useSearchParams()
  const searchParamResult = Object.fromEntries([...searchParam]) // chuyển cặp js thành key value
  return searchParamResult
}
