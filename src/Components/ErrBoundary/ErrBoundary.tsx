import { Component, ErrorInfo } from "react"
import { path } from "src/constants/path"
import { AppContext } from "src/contexts/auth.context"

interface Props {
  children?: React.ReactNode
}

interface State {
  hasError: boolean
}

// fix tình trạng trang trắng xóa - crash page

export default class ErrorBoundary extends Component<Props, State> {
  public static contextType = AppContext
  public state: State = {
    hasError: false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("uncaught error ", error, errorInfo)
  }

  public render() {
    const { darkMode }: { darkMode: boolean } = this.context as { darkMode: boolean }

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          className={`${darkMode ? "bg-gradient-to-r from-[#232526] to-[#414345]" : "bg-[#fff]"} w-full px-16 md:px-0 h-screen flex items-center justify-center`}
        >
          <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-red-600">
              500
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-red-600 mt-4">
              Error
            </p>
            <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
              Sorry, the page you are looking for could not be found.
            </p>
            <a
              href={path.home}
              className="flex items-center space-x-2 bg-primaryColor hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Return Home</span>
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
