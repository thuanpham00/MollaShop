import { User } from "./user.type";
import { SuccessResponse } from "./utils.type";

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string // thời gian lưu trữ access_token
  user: User
}>