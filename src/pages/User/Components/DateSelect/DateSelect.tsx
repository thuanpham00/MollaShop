export default function DateSelect() {
  return (
    <div className="sm:mt-2 flex flex-wrap flex-col sm:flex-row">
      <div className="sm:w-[20%] truncate pt-3 sm:text-right">Ngày sinh</div>
      <div className="w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Ngày</option>
            {Array(31)
              .fill(0)
              .map((item, index) => (
                <option key={item} value={item}>
                  {index + 1}
                </option>
              ))}
          </select>
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Tháng</option>
          </select>
          <select className="h-10 w-[32%] rounded-sm border border-black/10 px-3">
            <option disabled>Năm</option>
          </select>
        </div>
      </div>
    </div>
  )
}
