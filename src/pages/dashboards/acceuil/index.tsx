// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import { Fragment, useEffect, useState } from 'react'
import { MyAwesomeMap } from 'src/imports/Map'
import { Box, Button, Card, CardContent, CardHeader, Chip, Divider, Input, Modal, Typography } from '@mui/material'
import ApexColumnChart from 'src/views/charts/apex-charts/ApexColumnChart'
import ApexCandlestickChart from 'src/views/charts/apex-charts/ApexCandlestickChart'
import ApexHeatmapChart from 'src/views/charts/apex-charts/ApexHeatmapChart'
import TableSelection from 'src/views/table/data-grid/TableSelection'
import DialogAddCard from 'src/views/pages/dialog-examples/DialogAddCard'
import ListSites from 'src/views/components/list/ListSites'
import axios from 'axios'
import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'
import { tr } from 'date-fns/locale'

const AnalyticsDashboard = () => {
  const [coords, setCorrds] = useState({
    latitude: 33.566297,
    longitude: -7.660822
  })
  //33.566297, -7.660822
  const [display_name, setName] = useState('')
  const [open, setOpen] = useState(false)

  function error() {
    alert('Sorry, no position available.')
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  }

  function getCurrentCityName(position: any) {
    setCorrds({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    let url =
      'https://nominatim.openstreetmap.org/reverse?format=jsonv2' +
      '&lat=' +
      coords.latitude +
      '&lon=' +
      coords.longitude

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': 'https://o2cj2q.csb.app'
      }
    })
      .then(response => response.json())
      .then(data => setName(data.display_name))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      // (position) => {
      // setCorrds({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });

      // },
      getCurrentCityName,
      error,
      options
    )
  }, [])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div
      style={{
        marginLeft: '-1.5rem',
        marginTop: '-1.5rem',
        width: 'calc(100% + 3rem)',
        height: '100%'
      }}
    >
      <MyAwesomeMap coords={coords} />
      {/* <Grid item xs={12} md={10} lg={10}>
        <Chip
          label=' Ajouter un site'
          color='primary'
          variant='filled'
          onClick={handleOpen}
          icon={<Icon icon='material-symbols:add-circle-outline' fontSize={24} />}
          sx={{
            mb: 7,
            backgroundColor: '#f8f9fa',
            position: 'absolute',
            color: '#000',
            top: '12%',
            right: '3%',
            fontSize: 12,
            zIndex: 10000,
            '&:hover': {
              backgroundColor: '#f8f9fa',
              color: '#000',
              cursor: 'pointer',
              shadow: '10px 10px 10px 2rem rgba(0,123,255,1)'
            }
          }}
        />
        <DialogAddCard open={open} setOpen={setOpen} />
      </Grid> */}
      <Card
        sx={{
          position: 'absolute',
          width: '170px',
          top: '20%',
          left: '10%',
          zIndex: 500,
          backgroundColor: 'transparent'
        }}
      >
        <ListSites />
      </Card>

      <br />
      {/* <StepperLinearWithValidation /> */}
      {/* <StepperAlternativeLabel /> */}
      {/* <Grid container spacing={10} mt={12}>
            <Grid item xs={12} md={5}>
              <ApexColumnChart />
            </Grid>
            <Grid item xs={12} md={7}>
              <ApexCandlestickChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <TableSelection />
            </Grid>
            <Grid item xs={12} md={6}>
              <ApexHeatmapChart />
            </Grid>{' '}
          </Grid> */}
    </div>
  )
}
// AnalyticsDashboard.authGuard = true
// AnalyticsDashboard.acl = {
//   subject: 'interface',
//   action: 'maintenance'
// }
export default AnalyticsDashboard
