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
  occupant: string
  espace: string
  status: 'reservé' | 'libre'
  dateDebut: string | number
  dateFin: string | number
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
  reservé: { color: 'success' },
  libre: { color: 'error' }
}

// occupation table

const OccupationTable = (props: any) => {
  const { specificModel, globalModel, setNbrOccupations } = props
  const [reclamationData, setReclamationData] = useState([])

  const columns1: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 120,
      field: 'occupant',

      headerName: 'occupant',
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
                {row.occupant}
              </Typography>
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 200,
      field: 'dateDebut',
      headerName: 'Date Debut',
      renderCell: ({ row }: Reclamation) => (
        <Typography
          variant='body2'
          sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
        >
          {row.dateDebut}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 200,
      field: 'dateFin',
      headerName: 'Date Fin',
      renderCell: ({ row }: Reclamation) => (
        <Typography
          variant='body2'
          sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
        >
          {row.dateFin}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'status',
      headerName: 'Status',

      renderCell: ({ row }: Reclamation) => (
        <CustomChip
          skin='light'
          label={row.status}
          color={statusObj[row.status].color}
          sx={{
            height: 24,
            fontSize: '0.75rem',

            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
          }}
        />
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'espace',
      headerName: 'espace',
      renderCell: ({ row }: Reclamation) => (
        <CustomChip
          skin='light'
          label={row.espace}
          sx={{
            height: 24,
            fontSize: '0.75rem',

            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
          }}
          onClick={() => {
            globalModel.impl.selector.setSelection([Number(row.espace)], globalModel.model)
            globalModel.isolate(Number(row.espace))
            globalModel.fitToView([Number(row.espace)])
          }}
        />
      )
    }
  ]
  useEffect(() => {
    axios
      .get('http://localhost:8000/occupations')
      .then(response => {
        setReclamationData(response.data.data)
        setNbrOccupations(response.data.data.length)
        console.log(response.data.data.length)
      })
      .catch(error => {})
  }, [])
  const handleBackDrop = () => {
    axios
      .get('http://localhost:8000/occupations')
      .then(response => setReclamationData(response.data.data))
      .catch(error => {})
  }

  return (
    <Card
      sx={{
        p: 2
      }}
    >
      <CardHeader
        title='Liste des Occupations'
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
        rows={reclamationData.slice(-3)}
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
        onClick={() => (window.location.href = '/dashboards/occupation')}
      >
        Voir plus d'occupations
      </Button>
    </Card>
  )
}

export default OccupationTable
