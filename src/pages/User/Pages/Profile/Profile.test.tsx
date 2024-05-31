import { access_token } from "src/msw/auth.msw"
import { setAccessTokenToLs } from "src/utils/auth"
import { path } from "src/constants/path"
import { renderWithRouter } from "src/testUtils"
import { describe, expect, it } from "vitest"
import { screen, waitFor } from "@testing-library/react"

describe("Profile", () => {
  it("hiển thị trang profile", async () => {
    setAccessTokenToLs(access_token)
    renderWithRouter({ route: path.profile }) // container cha giúp truy cập vào node con

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Name")).toBeTruthy()
    })
  })
})
