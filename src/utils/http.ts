// set up kết nối tới server
import axios, { AxiosInstance } from "axios"
import { toast } from "react-toastify"
import { isAxiosError } from "./utils"
import { clearLS, getAccessTokenToLs, setAccessTokenToLs, setProfileToLs } from "./auth"
import { AuthResponse } from "src/types/auth.type"

class http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenToLs() // lấy ra và gửi lên server
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com/", // kết nối tới server
      timeout: 10000, // thời gian chờ
      headers: {
        "Content-Type": "application/json" // yêu cầu server trả về kết quả json
      }
    }),
      // interceptors : trung gian khi client gửi lên server và server gửi kết quả về client đều đi qua nó
      // sau khi login xong thì server gửi về access_token
      this.instance.interceptors.request.use(
        (config) => {
          if (this.accessToken && config.headers) {
            config.headers.authorization = this.accessToken
            return config
          }
          return config
        },
        (error) => {
          console.log(error)
        }
      ) // việc gửi access_token lên server để xác thực người dùng, bảo mật, phân quyền
    this.instance.interceptors.response.use(
      (response) => {
        //console.log(response)
        if (response.config.url === "login") {
          const data = response.data as AuthResponse // chỉ lưu access_token khi đăng nhập còn đăng kí thì chuyển qua đăng nhập
          this.accessToken = data.data.access_token // check url === "login" thì lưu access_token vào LS
          setAccessTokenToLs(this.accessToken)
          setProfileToLs(data.data.user)
        } else if (response.config.url === "logout") {
          // check url === "logout" thì remove access_token ra khỏi LS
          this.accessToken = ""
          clearLS()
        }
        return response
      },
      function (error) {
        // lỗi 404 khi lỗi đường dẫn
        if (isAxiosError(error) && error.response?.status === 404) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const Http = new http().instance
export default Http
