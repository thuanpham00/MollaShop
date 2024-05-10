export type SuccessResponse<Data> = {
  message: string
  data: Data
}

export type ErrorResponse<Data> = {
  message: string
  data?: Data
} // không bắt buộc có Data
