import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import axios from 'axios'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const EcommerceTotalSalesRadial = () => {
  // ** Hook
  const theme = useTheme()

  // const url_base = 'http://localhost:8080/api/gtc/'

  // const ids = [
  //   '01%2FHypervision%2FServers%2FGTC%20Parcelle%20K%2FInterface%20BACnet%2FIP%20Network%2FMODBUS%20Poste%2FApplication%2FD6_TE_AUX_U12',
  //   '01%2FHypervision%2FServers%2FGTC%20Parcelle%20K%2FInterface%20BACnet%2FIP%20Network%2FMODBUS%20Poste%2FApplication%2FD6_TE_AUX_U23'
  // ]

  const [series, setSeries] = useState<any>([])

  // const fetchData = async () => {
  //   try {
  //     const responses = await Promise.all(ids.map(id => axios.get(url_base + id)))

  //     const updatedData = responses.map((response, index) => {
  //       return {
  //         name: ids[index],
  //         data: response.data
  //       }
  //     })
  //     const data0 = updatedData[0].data.map((item: any) => {
  //       return item.Value
  //     })
  //     const data1 = updatedData[1].data.map((item: any) => {
  //       return item.Value
  //     })
  //     // const data2 = updatedData[2].data.map((item: any) => {
  //     //   return item.Value
  //     // })

  //     const datas = [parseInt(data0.slice(-1)[0]) / 10, parseInt(data1.slice(-1)[0]) / 10]

  //     setSeries(datas)

  //     console.log('datas', datas)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    // fetchData()
    // const intervalId = setInterval(fetchData, 5 * 60 * 1000) // relancer toutes les 5 minutes
    // return () => clearInterval(intervalId) // nettoyer l'intervalle après la fin du composant
  }, [])

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [theme.palette.info.main],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '60%' },
        track: { background: theme.palette.customColors.trackBg },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '1.25rem',
            color: theme.palette.text.secondary
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2.5 }}>
          D6_TE_AUX_U12/U23 (V)
        </Typography>
        <ReactApexcharts type='radialBar' height={103} options={options} series={series} />
        <Typography variant='body2' sx={{ mt: 7.5, fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>
          Last
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EcommerceTotalSalesRadial
