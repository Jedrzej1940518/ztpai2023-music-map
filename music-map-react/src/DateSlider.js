//https://codesandbox.io/p/sandbox/range-slider-date-range-ndngb6?file=%2Fsrc%2FApp.tsx

import './DateSlider.css'
import { useState } from 'react'
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react'

export default function DateSlider () {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)
  const [minValue2, setMinValue2] = useState(0)
  const [maxValue2, setMaxValue2] = useState(0)

  // Date Range Selection methods/state/constants
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    ''
  ]
  const yearDays = 365 + (new Date().getFullYear() % 4 === 0 ? 1 : 0)
  const [minMonthCaption, set_minMonthCaption] = useState('')
  const [maxMonthCaption, set_maxMonthCaption] = useState('')
  const formatDate = date => {
    let dateStr = ''
    let d = date.getDate()
    let m = date.getMonth()
    let y = date.getFullYear()
    let w = date.getDay()
    dateStr = weekDays[w] + ' ' + d + '-' + monthNames[m] + '-' + y
    return dateStr
  }
  const handleDateChange = e => {
    let d = new Date()
    let dd1 = new Date(d.getFullYear(), 0, 1)
    let dd2 = new Date(d.getFullYear(), 0, 1)

    dd1.setDate(e.minValue + 1)
    dd2.setDate(e.maxValue + 1)

    set_minMonthCaption(formatDate(dd1))
    set_maxMonthCaption(formatDate(dd2))
    setMinValue(e.minValue)
    setMaxValue(e.maxValue)
  }
  return (
    <div className='DateSlider'>
      <div className='multi-range-slider-container'>
        <MultiRangeSlider
          labels={monthNames}
          min={0}
          max={yearDays - 1}
          minValue={new Date().getDate()}
          maxValue={yearDays - 1}
          step={-1}
          minCaption={minMonthCaption}
          maxCaption={maxMonthCaption}
          onInput={handleDateChange}
          onChange={e => {
            setMinValue2(e.minValue)
            setMaxValue2(e.maxValue)
          }}
        />
      </div>
    </div>
  )
}
