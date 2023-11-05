// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { formatTime } from 'src/utils/date'

const AlertsDismissiblee = () => {
  // ** States
  const [open4, setOpen4] = useState<boolean>(true)
  const [dataM, setDataM] = useState([])
  const [data, setData] = useState([])
  const [theId, setId] = useState('')

  useEffect(() => {
    axios
      .get('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/attente')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  useEffect(() => {
    axios
      .get('https://clownfish-app-tugh2.ondigitalocean.app/maintenances/attente')
      .then(response => {
        setDataM(response.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  const handleClose = (id: any) => {
    setId(id)
    setOpen4(false)
  }
  const handleOpen = (id: any) => {
    setId(id)
    setOpen4(true)
  }

  return (
    <>
      {data?.map((row: any, index: number) => (
        <div key={index}>
          <Slide in={open4} direction='left' {...(open4 ? { timeout: 500 } : {})}>
            <Alert
              severity='error'
              key={row._id}
              action={
                <IconButton size='small' color='inherit' aria-label='close' onClick={() => handleClose(row._id)}>
                  <Icon icon='mdi:close' fontSize='inherit' />
                </IconButton>
              }
            >
              {row.descriptionProbleme}
            </Alert>
          </Slide>

          <Button disabled={open4} variant='outlined' sx={{ mt: 2 }} onClick={() => handleOpen(row._id)}>
            Entretien curatif: {row.title} a {formatTime(row.start)}
          </Button>
        </div>
      ))}
      {dataM?.map((row: any, index: number) => (
        <div key={index}>
          <Slide in={open4} direction='left' {...(open4 ? { timeout: 500 } : {})}>
            <Alert
              severity='warning'
              key={row._id}
              action={
                <IconButton size='small' color='inherit' aria-label='close' onClick={() => handleClose(row._id)}>
                  <Icon icon='mdi:close' fontSize='inherit' />
                </IconButton>
              }
            >
              {row.descriptionProbleme}
            </Alert>
          </Slide>

          <Button disabled={open4} variant='outlined' sx={{ mt: 2 }} onClick={() => handleOpen(row._id)}>
            Entretien programmé: {row.title} a {formatTime(row.start)}
          </Button>
        </div>
      ))}
    </>
  )
}

export default AlertsDismissiblee
