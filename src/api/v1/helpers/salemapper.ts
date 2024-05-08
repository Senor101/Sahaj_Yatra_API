const saleMapper = function (totalSaleData: { date: Date; amount: number }[]) {
  const todayDate = new Date()
  const day = todayDate.getDate()
  const month = todayDate.getMonth()
  const year = todayDate.getFullYear()

  let totalDailySale = 0
  let totalMonthlySale = 0
  let totalYearlySale = 0
  totalSaleData.forEach((s) => {
    if (year === s.date.getFullYear()) {
      totalYearlySale += s.amount
      if (month === s.date.getMonth()) {
        totalMonthlySale += s.amount
        if (day === s.date.getDate()) {
          totalDailySale += s.amount
        }
      }
    }
  })
  return {
    daily: totalDailySale,
    monthly: totalMonthlySale,
    yearly: totalYearlySale,
  }
}

export default saleMapper
