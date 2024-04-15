import axios, { AxiosError } from "axios"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError<T>(error)
}

export function isError422<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(current: number) {
  return new Intl.NumberFormat("de-DE").format(current)
}
// format 10000 -> 10.000

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  })
    .format(value)
    .replace(".", ",")
}
// format 1600 -> 1.6k

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> // loại bỏ giá trị undefined của 1 type
}