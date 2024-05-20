import { User } from "./user.type"
import { SuccessResponse } from "./utils.type"

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number // thời gian lưu trữ access_token
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
}>
