// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CardHeader, IconButton } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'

interface ReclamationRowType {
  _id: string
  name: string
  description: string
  type: string
  status: 'traitée' | 'non traitée' | 'non traite'
  idDev: string
  dateCreation: string | number
}
interface Reclamation {
  row: ReclamationRowType
}

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
  electrique: { color: 'info', icon: 'mdi:energy-circle' },
  électrique: { color: 'info', icon: 'mdi:energy-circle' },
  Electrique: { color: 'info', icon: 'mdi:energy-circle' },
  confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Eau: { color: 'info', icon: 'material-symbols:water-drop' },
  Température: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Mobilier: { color: 'error', icon: 'mdi:desk-lamp-on' },
  IQA: { color: 'success', icon: 'mdi:air-filter' },
  Securité: { color: 'error', icon: 'material-symbols:lock' },
  Assenceur: { color: 'info', icon: 'ph:elevator-light' },
  Ascenceur: { color: 'info', icon: 'ph:elevator-light' },
  Espacesverts: { color: 'success', icon: 'ion:leaf' },
  Déchets: { color: 'error', icon: 'ion:trash' },
  Ménage: { color: 'warning', icon: 'mdi:vacuum' },
  Autre: { color: 'primary', icon: 'mdi:dots-horizontal' },
  Climatisation: { color: 'info', icon: 'icon-park-solid:air-conditioning' }
}
//él

const columns1: GridColDef[] = [
  {
    flex: 0.08,
    field: 'name',
    minWidth: 200,
    headerName: 'Titre',
    renderCell: ({ row }: Reclamation) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                mb: -0.5,
                fontWeight: 600,
                lineHeight: 1.72,
                fontSize: '0.875rem',
                letterSpacing: '0.22px'
              }}
            >
              {row.name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.08,
    minWidth: 50,
    field: 'type',
    headerName: 'type',
    renderCell: ({ row }: Reclamation) => {
      const { type } = row

      const color = typeObj[type] ? typeObj[type].color : 'primary'

      return (
        <Tooltip
          title={
            <div>
              <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                {type}
              </Typography>
              {type}
            </div>
          }
        >
          <CustomAvatar skin='light' color={color} sx={{ width: 30, height: 30, '& svg': { fontSize: '1rem' } }}>
            {typeObj[type]?.icon && <Icon icon={typeObj[type]?.icon} />}
          </CustomAvatar>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'dateCreation',
    headerName: 'Date creation',
    renderCell: ({ row }: Reclamation) => (
      <Typography
        variant='body2'
        sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
      >
        {row.dateCreation}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'status',
    headerName: 'Status',

    renderCell: ({ row }: Reclamation) => (
      <CustomChip
        skin='light'
        label={row.status}
        color={statusObj[row.status]?.color}
        sx={{
          height: 24,
          fontSize: '0.75rem',

          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
        }}
      />
    )
  }
]

const ReclamationTable = () => {
  const [reclamationData, setReclamationData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:8000/reclamation')
      .then(response => {
        setReclamationData(response.data.data)
        // console.log(reclamationData.length)
      })
      .catch(error => {})
  }, [])
  const handleBackDrop = () => {
    axios
      .get('http://localhost:8000/reclamation')
      .then(response => {
        setReclamationData(response.data.data)
        console.log(response.data.data)
      })

      .catch(error => {})
  }

  return (
    <Card
      sx={{
        p: 2
      }}
    >
      <CardHeader
        title='Liste des Réclamations'
        action={
          <IconButton
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
            onClick={() => handleBackDrop()}
          >
            <Icon icon='mdi:refresh' fontSize={20} />
          </IconButton>
        }
      />
      <DataGrid
        autoHeight
        hideFooter
        rows={reclamationData.slice(-8)}
        columns={columns1}
        disableSelectionOnClick
        pagination={undefined}
        getRowId={row => row._id}
      />
      <Button
        fullWidth
        variant='contained'
        sx={{ mt: 4 }}
        endIcon={<Icon icon='mdi:arrow-right' />}
        onClick={() => (window.location.href = '/dashboards/reclamation')}
      >
        Voir plus de reclamations
      </Button>
    </Card>
  )
}

export default ReclamationTable
