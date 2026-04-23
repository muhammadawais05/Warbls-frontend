import * as React from "react"
import Chart from "react-apexcharts"

export const LineCharts = () => {
  return <Chart options={options} type="line" series={series} />
}

const options = {
  chart: {
    id: "basic-bar",
    type: "line"
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  },
  grid: {
    show: false
  }
}

const series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }
]
