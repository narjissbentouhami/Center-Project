// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Button, Card, CardContent, CardHeader, Collapse, ListItemIcon, Tooltip, Typography } from '@mui/material'
import axios from 'axios'

import { ThemeColor } from 'src/@core/layouts/types'

import CustomChip from 'src/@core/components/mui/chip'
import { formatTime } from 'src/utils/date'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  'en cours': { color: 'success' },
  'En cours': { color: 'success' },
  attente: { color: 'warning' },
  Attente: { color: 'warning' },
  Done: { color: 'primary' },
  done: { color: 'primary' }
}
// const statusObj: StatusObj = {
//   Maintenance: { color: 'success' },
//   Alert: { color: 'error' }
// }

const MainProgList = (props: any) => {
  const { globalModel } = props

  const [open, setOpen] = useState<any>([])

  const handleClick = (index: any) => {
    let newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  const handleClick1 = (index: any) => {
    let newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  const [maintenanceData, setMaintenanceData] = useState([])
  const [maintenanceData2, setMaintenanceData2] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/maintenances/encours')
      .then(response => setMaintenanceData(response.data.data.reverse()))
      .catch(error => {})

    axios.get('http://localhost:8000/maintenances/attente').then(response => {
      setMaintenanceData2(response.data.data.reverse())
    })
  }, [])

  return (
    <Fragment>
      <List>
        {maintenanceData.map((maint: any, index: number) => (
          <Fragment key={'encours' + index}>
            <ListItem disablePadding key={'encours' + index}>
              <ListItemButton
                sx={{
                  p: 1
                }}
                onClick={() => {
                  handleClick('encours' + index)
                  globalModel.impl.selector.setSelection([Number(maint.Device_ID)], globalModel.model)
                  globalModel.isolate(Number(maint.Device_ID))
                  globalModel.fitToView([Number(maint.Device_ID)])
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: 1
                  }}
                >
                  <Icon icon={open[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: '600',
                      fontSize: 13
                    }
                  }}
                  primary={maint.title}
                />
                <CustomChip
                  skin='light'
                  label={maint.etat}
                  color={statusObj[maint.etat]?.color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',

                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Collapse in={open['encours' + index]} timeout='auto' unmountOnExit>
              <Card key={'encours' + index}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' component='div'>
                    Title : {maint.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }}>Type : {'Electrique'}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Description : </Typography>
                  <Typography variant='body2'>{maint.description}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Debut : </Typography>
                  <Typography variant='body2'>{formatTime(maint.start)}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Fin : </Typography>
                  <Typography variant='body2'>{formatTime(maint.end)}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Téchnicien : {'Téchnicien 2'}</Typography>
                  <Button color='primary' onClick={() => window.open('../../apps/user/view/overview/', '_self')}>
                    Plus de details
                  </Button>
                </CardContent>
              </Card>
            </Collapse>
          </Fragment>
        ))}
        {maintenanceData2.map((maint: any, index: number) => (
          <Fragment key={'attente' + index}>
            <ListItem disablePadding key={'attente' + index}>
              <ListItemButton
                sx={{
                  p: 1
                }}
                onClick={() => {
                  handleClick1('attente' + index)
                  globalModel.impl.selector.setSelection([Number(maint.Device_ID)], globalModel.model)
                  globalModel.isolate(Number(maint.Device_ID))
                  globalModel.fitToView([Number(maint.Device_ID)])
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: 1
                  }}
                >
                  <Icon icon={open['attente' + index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: '600',
                      fontSize: 13
                    }
                  }}
                  primary={maint.title}
                />
                <CustomChip
                  skin='light'
                  label={maint.etat}
                  color={statusObj[maint.etat]?.color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',

                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Collapse in={open['attente' + index]} timeout='auto' unmountOnExit>
              <Card key={'attente' + index}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' component='div'>
                    Title : {maint.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }}>Type : {maint.Calendar}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Description : </Typography>
                  <Typography variant='body2'>{maint.description}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Debut : </Typography>
                  <Typography variant='body2'>{maint.start}</Typography>
                  <Typography sx={{ mb: 1.5 }}>Fin : </Typography>
                  <Typography variant='body2'>{maint.end}</Typography>
                  <Button color='primary' onClick={() => window.open('../../apps/user/view/overview/', '_self')}>
                    Plus de details
                  </Button>
                </CardContent>
              </Card>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Fragment>
  )
}

export default MainProgList
