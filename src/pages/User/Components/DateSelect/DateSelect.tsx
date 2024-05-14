// import { range } from "lodash"
import range from "lodash/range" // giảm kích thước file

import { useEffect, useState } from "react"

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, errorMessage, value }: Props) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        day: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: numberFormSelect, name } = event.target
    const newDate = {
      day: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1990,
      [name]: Number(numberFormSelect)
    }
    setDate(newDate)

    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
      <div className="sm:w-[20%] truncate pt-3 sm:text-right">Ngày sinh</div>
      <div className="w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select
            onChange={handleChangeDate}
            value={value?.getDate() || date.day}
            name="day"
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-primaryOrange hover:border-2 text-[#000]"
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={handleChangeDate}
            value={value?.getMonth() || date.month}
            name="month"
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-primaryOrange hover:border-2 text-[#000]"
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            onChange={handleChangeDate}
            value={value?.getFullYear() || date.year}
            name="year"
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-primaryOrange hover:border-2 text-[#000]"
          >
            <option disabled>Năm</option>
            {range(1990, 2025).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 min-h-[1.25rem] text-red-500 text-sm">{errorMessage}</div>
      </div>
    </div>
  )
}
