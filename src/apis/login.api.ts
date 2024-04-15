import { AuthResponse } from "src/types/auth.type"
import Http from "src/utils/http"

export const loginApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return Http.post<AuthResponse>("register", body)
  }, // lỗi 404 xuất hiện khi đường dẫn ko chính xác "registerrr"
  loginAccount: (body: { email: string; password: string }) => {
    return Http.post<AuthResponse>("login", body)
  },
  logoutAccount: () => {
    return Http.post("logout")
  }
}

// cái api dùng để fetch ra nó khác với router chia luồng
