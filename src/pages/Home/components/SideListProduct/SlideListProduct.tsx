import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "src/contexts/auth.context"

interface Props {
  children: React.ReactNode
  title: string
  desc: string
  className?: string
  timeScroll: number
}

export default function SlideListProduct({
  children,
  title,
  desc,
  className = "mt-4 lg:mt-8 p-4",
  timeScroll
}: Props) {
  const { darkMode } = useContext(AppContext)
  const listScroll = useRef<HTMLDivElement>(null)

  const [offsetLeft, setOffsetLeft] = useState<number>(0)
  const [scrollAuto, setScrollAuto] = useState<boolean>(true)

  const width = listScroll.current?.offsetWidth as number

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lastCheckTime: number = 0
  const handleClickOffsetDec = () => {
    const mark = offsetLeft - 304
    if (mark <= 0) {
      listScroll.current?.scroll({ left: width, behavior: "smooth" })
      setOffsetLeft(width)
    } else {
      listScroll.current?.scroll({ left: mark, behavior: "smooth" })
      setOffsetLeft(mark)
    }
    setScrollAuto(false)
    lastCheckTime = Date.now()
  }

  const handleClickOffsetInc = () => {
    const mark = offsetLeft + 304
    if (mark <= width) {
      listScroll.current?.scroll({ left: mark, behavior: "smooth" })
      setOffsetLeft(mark)
    } else {
      listScroll.current?.scroll({ left: 0, behavior: "smooth" })
      setOffsetLeft(0)
    }
    setScrollAuto(false)
    lastCheckTime = Date.now() // lưu time lần cuối click
  }

  // w = 1216
  useEffect(() => {
    if (scrollAuto) {
      const intervalId = setInterval(() => {
        const mark = offsetLeft + 304
        if (mark <= width) {
          listScroll.current?.scroll({ left: mark, behavior: "smooth" })
          setOffsetLeft(mark)
        } else if (mark >= width) {
          listScroll.current?.scroll({ left: 0, behavior: "smooth" })
          setOffsetLeft(0)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }, timeScroll)

      return () => clearInterval(intervalId)
      // gọi setInterval xong thì nhớ clear
    }

    const currentTime: number = Date.now()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const time: number = currentTime - lastCheckTime // thời gian hiện tại
    if (time >= 3000) {
      setScrollAuto(true)
    }
  }, [offsetLeft, width, timeScroll, scrollAuto, lastCheckTime])

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <h2
          className={`flex-shrink-0 uppercase text-xl md:text-3xl font-semibold ${darkMode ? "text-[#fff]/90" : "text-[#000]"} text-left -tracking-normal`}
        >
          {title}
        </h2>
        <div className="flex-grow h-[1px] bg-gray-300"></div>
      </div>
      <h3 className={`text-base ${darkMode ? "text-[#fff]/70" : "text-gray-500"} capitalize mt-1`}>
        {desc}
      </h3>

      <div className="mt-4 flex relative">
        <button
          onClick={handleClickOffsetDec}
          className="absolute top-1/2 left-0 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div ref={listScroll} className="overflow-x-hidden">
          <div className="flex items-center flex-nowrap gap-4">{children}</div>
        </div>

        <button
          onClick={handleClickOffsetInc}
          className="absolute top-1/2 right-0 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
