import * as React from "react"
import Chart from "react-apexcharts"

export const BarCharts = () => {
  return <Chart options={options} type="bar" series={series} />
}

const options = {
  chart: {
    id: "basic-bar",
    type: "bar"
  },
  xaxis: {
    categories: ["Norway", "Sweden", "USA", "Germany", "India", "Russia"]
  },
  grid: {
    show: false
  }
}

const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60]
  }
]
