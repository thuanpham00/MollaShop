import { rest } from "msw"
import { config } from "src/constants/config"
import { HttpStatusCode } from "src/constants/httpStatusCode.enum"
import { access_token_1giay } from "./auth.msw"

const meRes = {
  message: "Lấy người dùng thành công",
  data: {
    _id: "663795cca71a6c029dec4543",
    roles: ["User"],
    email: "admin_@gmail.com",
    createdAt: "2024-05-05T14:21:00.359Z",
    updatedAt: "2024-05-23T11:56:11.988Z",
    name: "Thuan Pham",
    date_of_birth: "2004-07-29T17:00:00.000Z",
    address: "hcm",
    phone: "0931554657",
    avatar: "54d37a0d-ba7b-494d-ad90-1c071fa1d837.jpg"
  }
}

const meRequest = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get("authorization")
  console.log(1)
  if (access_token === access_token_1giay) {
    return res(
      ctx.status(HttpStatusCode.Unauthorized),
      ctx.json({
        message: "Lỗi",
        data: {
          message: "Token hết hạn",
          name: "EXPIRED_TOKEN"
        }
      })
    )
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

export const userRequests = [meRequest]
