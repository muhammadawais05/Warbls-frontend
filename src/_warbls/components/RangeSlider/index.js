import * as React from "react"
import { Box, Slider } from "@material-ui/core"

function valuetext(value) {
  return `${value}°C`
}

export default function RangeSlider({ setValue, value }) {
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "BPM range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="secondary"
        min={50}
        max={200}
        defaultValue={50}
      />
    </Box>
  )
}
