// set up kết nối tới server
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { toast } from "react-toastify"
import { isAxiosError, isAxiosExpiredTokenError, isError401 } from "./utils"
import {
  clearLS,
  getAccessTokenToLs,
  getRefreshTokenToLs,
  setAccessTokenToLs,
  setProfileToLs,
  setRefreshTokenToLs
} from "./auth"
import { AuthResponse, RefreshTokenResponse } from "src/types/auth.type"
import { config } from "src/constants/config"
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN } from "src/apis/login.api"
import { ErrorResponse } from "src/types/utils.type"

// Purchase: 1 - 3 (số giây) - set thời gian access-token là 5 giây
// Me: 2 - 5
// refresh-token cho Purchase: 3 - 4
// gọi lại Purchase: giây thứ 4 - 6
// refresh-token mới cho me:5 - 6

export class http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenToLs()
    this.refreshToken = getRefreshTokenToLs() // khởi tạo
    this.refreshTokenRequest = null // khởi tạo
    // lấy ra và gửi lên server
    this.instance = axios.create({
      baseURL: config.baseUrl, // kết nối tới server
      timeout: 10000, // thời gian chờ
      headers: {
        "Content-Type": "application/json", // yêu cầu server trả về kết quả json
        "expire-access-token": 5, // thời gian hết hạn access-token // 10s
        "expire-refresh-token": 60 * 60 // 1 giờ
      }
    })
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
        return Promise.reject(error)
      }
    ) // việc gửi access_token lên server để xác thực người dùng, bảo mật, phân quyền
    this.instance.interceptors.response.use(
      (response) => {
        //console.log(response)
        if (response.config.url === URL_LOGIN) {
          // url này la trong backend ko phải router
          const data = response.data as AuthResponse // chỉ lưu access_token khi đăng nhập còn đăng kí thì chuyển qua đăng nhập
          this.refreshToken = data.data.refresh_token
          this.accessToken = data.data.access_token // check url === "login" thì lưu access_token vào LS
          setAccessTokenToLs(this.accessToken) // lưu accessToken
          setRefreshTokenToLs(this.refreshToken) // lưu refreshToken
          setProfileToLs(data.data.user)
          // console.log(response)
        } else if (response.config.url === URL_LOGOUT) {
          // check url === "logout" thì remove access_token và refresh_token ra khỏi LS
          this.accessToken = ""
          this.refreshToken = ""
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // có 2 cách tiếp cận đúng ko, cách 1 là xử lý chung các api , cách 2 là xử lý riêng cho từng api
        // chỉ toast lỗi liên quan đến 422 và 401
        // lỗi 404 khi lỗi đường dẫn
        if (isAxiosError(error) && error.response?.status === 404) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // lỗi Unauthorized (401) có nhiều trường hợp
        // - token không đúng
        // - không truyền token
        // - token hết hạn*
        // nếu là lỗi 401
        if (isError401(error)) {
          // trường hợp token hết hạn và request đó KO PHẢI là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          console.log(error)

          if (
            isAxiosExpiredTokenError<ErrorResponse<{ name: string; message: string }>>(error) &&
            url !== URL_REFRESH_TOKEN
          ) {
            // refreshToken tự động khi hết hạn token - lỗi 401
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 mà dùng (trường hợp gọi 2 lần refresh liên tục)
                  // trường hợp 2 thk cùng hết hạn chỉ gọi 1 lần
                  setTimeout(() => {
                    this.refreshTokenRequest = null // có access-token mới rồi nên set lại null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((accessToken) => {
              if (error.response?.config.headers) {
                // gửi lại lên server để xác thực user

                return this.instance({
                  ...config,
                  headers: { ...config.headers, authorization: accessToken } // gửi lại lên server accessToken mới
                })
                // nghĩa là chúng ta tiếp tục gọi là request cũ vừa bị lỗi
              }
            }) // return để ko bị clear nếu chạy trong if
          }
          // còn những trường hợp token ko đúng
          // ko truyền token
          // token hết hạn nhưng gọi refresh bị fail
          // thì tiến hành clear LS và toast.message

          // nếu refresh-token hết hạn thì nó clearLS
          clearLS()
          this.accessToken = ""
          this.refreshToken = ""
          const data = error.response?.data as ErrorResponse<{ name: string; message: string }>
          const message = data.data?.message
          toast.error(message)
          // window.location.reload()
        } // khi nó 401 thì tự logout // lỗi 401 - hết hạn token // sai token
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken // gửi đúng api yêu cầu // gửi refresh_token lên nó trả về access_token mới
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLs(access_token) // set lại vào trong LS
        this.accessToken = access_token // gán lại access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.refreshToken = ""
        this.accessToken = ""
        throw error
      })
  }
}

const Http = new http().instance
export default Http

/**
 * Flow hoạt động tóm tắt:
  1. User Login:
  Cấp access token (ngắn hạn) và refresh token (dài hạn).
  2. Access Token Expired:
  Sử dụng refresh token để lấy access token mới.
  3. Refresh Token Expired:
  Yêu cầu người dùng đăng nhập lại.
  4. User Re-login:
  Cấp lại access token và refresh token mới.
 */

/**
 * Login user (xác thực người dùng) được cấp access-token (ngắn hạn) và refresh-token (dài hạn) đi kèm thời gian
 * Nếu access-token hết hạn -> dùng refresh-token tạo lại access-token mới
 * Tới khi refresh-token hết hạn -> đăng nhập lại
 */
