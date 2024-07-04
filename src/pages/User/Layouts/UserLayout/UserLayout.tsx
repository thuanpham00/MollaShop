import { memo, useContext } from "react"
import UserSideNav from "../../Components/UserSideNav"
import { AppContext } from "src/contexts/auth.context"
import { Outlet } from "react-router-dom"

function UserLayoutInner() {
  const { darkMode } = useContext(AppContext)
  return (
    <div
      className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345] text-white" : "bg-gray-100 text-black"} py-4 duration-200`}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 lg:col-span-2">
            <UserSideNav />
          </div>
          <div
            className={`md:col-span-9 lg:col-span-10 rounded-sm ${darkMode ? "bg-[#252323]" : "bg-[#fff]"} duration-200 shadow p-6`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

const UserLayout = memo(UserLayoutInner)
export default UserLayout
