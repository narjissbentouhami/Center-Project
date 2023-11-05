// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import { Typography } from '@mui/material'
import axios from 'axios'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

import { ThemeColor } from 'src/@core/layouts/types'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}
const statusObj: StatusObj = {
  traitée: { color: 'success' },
  'non traitée': { color: 'error' },
  'non traite': { color: 'error' }
}

interface TypeObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}
const typeObj: TypeObj = {
  electrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  électrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  Electrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Eau: { color: 'info', icon: 'material-symbols:water-drop' },
  Température: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Mobilier: { color: 'error', icon: 'mdi:desk-lamp-on' },
  IQA: { color: 'success', icon: 'mdi:air-filter' },
  Securité: { color: 'error', icon: 'material-symbols:lock' },
  Assenceur: { color: 'info', icon: 'ph:elevator-light' },
  Espacesverts: { color: 'success', icon: 'ion:leaf' },
  Déchets: { color: 'error', icon: 'ion:trash' },
  Ménage: { color: 'warning', icon: 'mdi:vacuum' },
  Autre: { color: 'primary', icon: 'mdi:dots-horizontal' },
  Climatisation: { color: 'info', icon: 'icon-park-solid:air-conditioning' }
}

const ReclamClientTraitList = (props: any) => {
  const [reclamationData, setReclamationData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/reclamation/traite')
      .then(response => {
        setReclamationData(response.data.data.reverse())
      })
      .catch(error => {})
  }, [])

  return (
    <Fragment>
      <Typography sx={{ fontSize: 18, p: 3, fontWeight: '500', textAlign: 'center' }}>
        Reclamations Client Traitées
      </Typography>
      <List>
        {reclamationData.map((reclamation: any, index: number) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              sx={{
                p: 1
              }}
            >
              <CustomAvatar
                skin='light'
                color={typeObj[reclamation.type] ? typeObj[reclamation.type]?.color : 'primary'}
                sx={{ width: 30, height: 30, '& svg': { fontSize: '1rem' } }}
              >
                <Icon icon={typeObj[reclamation.type].icon} />
              </CustomAvatar>
              <ListItemText
                sx={{
                  '.MuiTypography-root': {
                    fontWeight: '500',
                    fontSize: 12,
                    marginLeft: '0.5rem'
                  }
                }}
                primary={reclamation.name}
              />
              <CustomChip
                skin='light'
                label={reclamation.status}
                color={statusObj[reclamation.status]?.color}
                sx={{
                  height: 24,
                  fontSize: '0.75rem',

                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Fragment>
  )
}

export default ReclamClientTraitList
