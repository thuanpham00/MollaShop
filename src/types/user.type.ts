type Roles = ["User"] | ["Admin"]

export type User = {
  _id: string
  roles: Roles[]
  email: string
  name?: string
  date_of_birth?: string // ISO 8601
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
