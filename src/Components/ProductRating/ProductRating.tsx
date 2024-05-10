interface Props {
  rating: number
}

export default function ProductRating({ rating }: Props) {
  const handleWidth = (order: number) => {
    // thuộc toán rating
    // rating = 3.4
    // 1 <= 3.4 => 100%
    // 2 <= 3.4 => 100%
    // 3 <= 3.4 => 100%
    // 4 > 3.4 => 40% (4 - 3.4 < 1)
    // 5 > 3.4 => 0% (5 - 3.4 > 1)
    if (order <= rating) {
      return "100%"
    }
    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + "%"
    }
    if (order > rating && order - rating > 1) {
      return "0%"
    }
  }
  return (
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="relative" key={index}>
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{
                  width: handleWidth(index + 1)
                }}
              >
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="h-4 w-4 fill-yellow-300 text-yellow-300"
                >
                  <polygon
                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground="new 0 0 15 15"
                viewBox="0 0 15 15"
                x={0}
                y={0}
                className="h-4 w-4 fill-current text-gray-300"
              >
                <polygon
                  points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )
        })}
    </div>
  )
}
