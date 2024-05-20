import { AuthResponse } from "src/types/auth.type"
import Http from "src/utils/http"

export const URL_LOGIN = "login"
export const URL_REGISTER = "register"
export const URL_LOGOUT = "logout"
export const URL_REFRESH_TOKEN = "refresh-access-token"

export const loginApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return Http.post<AuthResponse>(URL_REGISTER, body)
  }, // lỗi 404 xuất hiện khi đường dẫn ko chính xác "registerrr"
  loginAccount: (body: { email: string; password: string }) => {
    return Http.post<AuthResponse>(URL_LOGIN, body)
  },
  logoutAccount: () => {
    return Http.post(URL_LOGOUT)
  }
}

// cái api dùng để fetch ra nó khác với router chia luồng
// api backend
