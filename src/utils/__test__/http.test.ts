import { beforeEach, describe, expect, it } from "vitest"
import { http } from "../http"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"
import { setAccessTokenToLs, setRefreshTokenToLs } from "../auth"
import { access_token_1giay, refresh_token_1000days } from "src/msw/auth.msw"

/**
 * beforeAll: Chạy một lần trước tất cả các bài kiểm thử trong một khối test. 
   beforeEach: Chạy trước mỗi bài kiểm thử.
 */

// expect dùng để viết các biểu thức kiểm tra tính đúng sai
// waitFor được sử dụng để đợi các thay đổi không đồng bộ xảy ra

describe("http axios", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let Http = new http().instance
  beforeEach(() => {
    localStorage.clear()
    Http = new http().instance
  })

  it("goi api", async () => {
    // ko nên đụng đến thư mục apis
    // vì chúng ta test riêng file http chỉ "nên" dùng http thoi
    // vì lỡ như thư mục api có thay đổi gì đó
    // thì cũng không ảnh hưởng gì đến file test này
    const res = await Http.get("products")
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it("auth request", async () => {
    // nên có 1 account test và 1 server test
    await Http.post("login", {
      email: "admin_@gmail.com",
      password: "thuan123456"
    })
    const res = await Http.get("me")
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it("refresh token", async () => {
    // muốn refresh_token thì cần access_token hết hạn && thời gian của refresh_token còn (expire)
    setAccessTokenToLs(access_token_1giay)
    setRefreshTokenToLs(refresh_token_1000days)
    const httpNew = new http().instance
    const res = await httpNew.get("me")
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
