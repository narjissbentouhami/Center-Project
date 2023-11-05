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
import { Card, CardContent, CardHeader, Collapse, ListItemIcon, Tooltip, Typography } from '@mui/material'
import axios from 'axios'

import { ThemeColor } from 'src/@core/layouts/types'

import CustomChip from 'src/@core/components/mui/chip'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  On: { color: 'error' },
  Off: { color: 'info' }
}
// const statusObj: StatusObj = {
//   Maintenance: { color: 'success' },
//   Alert: { color: 'error' }
// }

const AlertList = (props: any) => {
  const { globalModel } = props
  const url_base = 'http://localhost:8000/'

  const [alarmes, setAlarmes] = useState<any>([])
  const Alerts = async () => {
    try {
      const dataexcel = await axios.get(url_base + 'GTC/excel')
      const object = dataexcel.data.data.filter(
        (item: any) =>
          (item.DataName.includes('Alarme') || item.DataName.includes('alarme')) &&
          (item.DataValue === 'On' || item.DataValue === 'Off')
      )
      setAlarmes(object)
    } catch (error) {}
  }

  useEffect(() => {
    Alerts()
  }, [])

  return (
    <Fragment>
      {/* <Typography sx={{ fontSize: 18, p: 3, fontWeight: '500', textAlign: 'center' }}>Alarmes</Typography> */}
      <List>
        {alarmes.map((alarme: any, index: number) => (
          <Fragment key={index}>
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  p: 1
                }}
              >
                <ListItemText
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: '600',
                      fontSize: 13
                    }
                  }}
                  primary={alarme.DataName}
                />
                <CustomChip
                  skin='light'
                  label={alarme.DataValue}
                  color={statusObj[alarme.DataValue]?.color}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',

                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Fragment>
  )
}

export default AlertList
