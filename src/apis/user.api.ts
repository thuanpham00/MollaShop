import { User } from "src/types/user.type"
import { SuccessResponse } from "src/types/utils.type"
import Http from "src/utils/http"

export interface BodyUpdateProfile
  extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile: () => {
    return Http.get<SuccessResponse<User>>("me")
  },
  updateProfile: (body: BodyUpdateProfile) => {
    return Http.put<SuccessResponse<User>>("user", body)
  },
  uploadAvatar(body: FormData) {
    return Http.post<SuccessResponse<string>>("user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
}

export default userApi
