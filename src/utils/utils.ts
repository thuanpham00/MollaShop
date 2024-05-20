import axios, { AxiosError } from "axios"
import { config } from "src/constants/config"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"
import minhthuan from "src/img/minhthuan.jpg"
import { ErrorResponse } from "src/types/utils.type"

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError<T>(error)
}

export function isError422<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isError401<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isError401<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === "EXPIRED_TOKEN"
  )
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

export function rateSale(original: number, sale: number) {
  return 100 - Math.round((sale / original) * 100) + "%"
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  ) // loại bỏ kí tự đặc biệt

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}` // thay khoảng trắng == "-"
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-")
  return arr[arr.length - 1]
}

// ví dụ chuỗi "thuan-i.427138492384" nó tách ra ["thuan", "427138492384"] và length = 2 nó trừ 1 để lấy phần tử cuối - 1 lấy ra ID

export const getNameFromeEmail = (email: string) => {
  const name = email.split("@")
  return name[0]
}

// ví dụ chuỗi phamminhthuan912@gmail.com => lấy được phamminhthuan912

export const getAvatarUrl = (avatarName: string) => {
  if (avatarName) {
    return `${config.baseUrl}images/${avatarName}`
  } else {
    return minhthuan
  }
}
