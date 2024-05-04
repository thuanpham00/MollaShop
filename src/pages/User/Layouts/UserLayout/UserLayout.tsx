import UserSideNav from "../../Components/UserSideNav"

interface Props {
  children: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div>
      <UserSideNav />
      {children}
    </div>
  )
}
