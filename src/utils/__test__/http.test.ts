import { beforeEach, describe, expect, it } from "vitest"
import { http } from "../http"
import { HttpStatusCode } from "@/constants/httpStatusCode.enum"
import { setAccessTokenToLs, setRefreshTokenToLs } from "../auth"

describe("http axios", () => {
  let Http = new http().instance
  beforeEach(() => {
    localStorage.clear()
    Http = new http().instance
  })
  const access_token_1giay =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMTE6MDg6MjguMTc3WiIsImlhdCI6MTcxNjYzNTMwOCwiZXhwIjoxNzE2NjM1MzA5fQ.XSqC1ltfny9_iXv_h6YcNOCEAO-rR7BCvAeiIL-npjY"

  const refresh_token_1000days =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mzc5NWNjYTcxYTZjMDI5ZGVjNDU0MyIsImVtYWlsIjoiYWRtaW5fQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjVUMTE6MTI6MzAuMjYzWiIsImlhdCI6MTcxNjYzNTU1MCwiZXhwIjoxODAzMDM1NTUwfQ.5G8fPhCn2xoVqN7CZU186gPnB2DeSSuAeGZVK5zyVO4"

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
