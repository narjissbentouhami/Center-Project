import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import format from 'date-fns/format'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { YAxis } from 'recharts'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { InputAdornment, TextField } from '@mui/material'
import spacing from 'src/@core/theme/spacing'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const ApexLineChart = (values: any) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [startDate, setStartDate] = useState<DateType>(new Date())

  const [series, setSeries] = useState<Array<{ name: string; data: any }>>([])
  const [labels, setLabels] = useState<Array<string>>([])
  const [name, setName] = useState<string>()
  const [desc, setDesc] = useState<string>()
  const [unit, setUnit] = useState<string>()

  const fetchData = async () => {
    try {
      // Filter the data based on the startDate and endDate
      const filteredValues =
        startDate && endDate
          ? values.values.filter((item: any) => {
              const itemDate = new Date(item.date)
              return itemDate >= startDate && itemDate <= endDate
            })
          : values.values

      // Then use the filteredValues instead of values.values to generate your series
      const dataseries = filteredValues.map((item: any) => {
        const floatValue = parseFloat(item.data)
        return floatValue.toFixed(2)
      })

      // const dataseries = values.values.map((item: any) => {
      //   const floatValue = parseFloat(item.data)
      //   return floatValue.toFixed(2)
      // })
      // console.log(dataseries)
      const labelseries = filteredValues.map((item: any) => {
        // return item.date.split('T')[1].substr(0, 5)
        return item.date.split('T')[0].substr(5, 8)
      })
      for (let i = 0; i < labelseries.length; i++) {
        if (i % 2 === 0) {
          labelseries[i] = ''
        }
      }

      setName(values.values.map((item: any) => item.name)[0])
      setDesc(values.values.map((item: any) => item.desc)[0])
      setUnit(values.values.map((item: any) => item.unit)[0])

      setLabels(labelseries)
      setSeries([
        {
          name: 'VAR1',
          data: dataseries
        }
      ])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Find the earliest and latest dates in your data
    const dates = values.values.map((item: any) => new Date(item.date))
    const earliestDate = new Date(Math.min(...dates))
    const latestDate = new Date(Math.max(...dates))

    // Set startDate and endDate to span the entire range of dates in your data
    setStartDate(earliestDate)
    setEndDate(latestDate)
  }, [])

  useEffect(() => {
    fetchData()
  }, [values, startDate, endDate])
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#437bff'],
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#437bff'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]} ${unit}</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: labels
    }
  }

  const CustomInput = forwardRef((props: PickerProps, ref: any) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        sx={{
          width: '87%',
          marginRight: '0px'
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' style={{ marginLeft: '0px', marginRight: '5px' }}>
              <Icon icon='mdi:bell-outline' style={{ fontSize: '0.8rem' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end' style={{ marginLeft: '0px', marginRight: '0px' }}>
              <Icon icon='mdi:chevron-down' style={{ fontSize: '0.8rem' }} />
            </InputAdornment>
          ),
          style: { fontSize: '0.8rem' } // Ajoutez cette ligne
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: theme => `${theme.shadows[0]} !important`
      }}
    >
      <CardHeader
        className='card-header-graphs'
        subheader={name}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] },
          padding: '0px',
          height: '4vh'
        }}
        action={
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleOnChange}
            placeholderText='Click to select a date'
            customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
          />
        }
      />
      <CardContent
        sx={{
          padding: '0px',
          marginBottom: '0px'
        }}
      >
        <ReactApexcharts type='line' height={200} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
