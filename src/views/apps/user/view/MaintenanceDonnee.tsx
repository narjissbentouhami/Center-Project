// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

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
import { formatTime } from 'src/utils/date'
import { CardHeader, IconButton, LinearProgress } from '@mui/material'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import OptionsMenu from 'src/@core/components/option-menu'

interface MaintenanceRowType {
  url: string
  title: string
  start: string
  end: string
  allDay: boolean
  Calendar: 'Alert' | 'Maintenance'
  isCritical: boolean
  Device_ID: number
  technicienID: string
  progressValue: number
  progressColor: ThemeColor
  documents: string
}
interface Maintenance {
  row: MaintenanceRowType
}
//this ://////////////////////////////////////////:
interface TableBodyRowType {
  id: number
  name: string
  email: string
  total: number
  dueDate: string
  avatarSrc?: string
  balance: string | number
  status: 'Draft' | 'Downloaded' | 'Partial Payment' | 'Past Due'
}

interface CellType {
  row: TableBodyRowType
}
interface StatusObjj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}
const rows: TableBodyRowType[] = [
  {
    id: 2798,
    balance: 489,
    total: 277.39,
    status: 'Draft',
    name: 'Joseph Wheeler',
    email: 'nuroani@icpair.com',
    avatarSrc: '/images/avatars/1.png',
    dueDate: `2/10/${new Date().getFullYear()}`
  },
  {
    id: 1304,
    balance: 0,
    total: 117.58,
    name: 'May Lloyd',
    email: 'jeju@ma.co.uk',
    status: 'Partial Payment',
    avatarSrc: '/images/avatars/2.png',
    dueDate: `11/9/${new Date().getFullYear()}`
  }
]
const renderClientAvatar = (row: TableBodyRowType) => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3.5, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3.5, width: 30, height: 30, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}
const renderBalance = (row: TableBodyRowType) => {
  if (row.balance === 0) {
    return <CustomChip size='small' skin='light' color='success' label='Paid' />
  } else if (row.balance === 'unpaid') {
    return <CustomChip size='small' skin='light' color='error' label='Unpaid' />
  } else {
    return <Typography variant='body2'>{`$${row.balance}`}</Typography>
  }
}
////////////////////////////////////////////////////////////
interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}
const statusObj: StatusObj = {
  Maintenance: { color: 'success' },
  Alert: { color: 'error' }
}
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))
const MaintenanceDonnee = (props: any) => {
  const { specificModel, globalModel } = props
  const [maintenanceData, setMaintenanceData] = useState([])

  const columns1: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 200,
      field: 'title',
      headerName: 'Titre',
      // renderCell: ({ row }: Maintenance) => (
      //   <Typography
      //     variant='body2'
      //     sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
      //   >
      //     {row.title}
      //   </Typography>
      // )
      renderCell: ({ row }: Maintenance) => (
        <StyledLink href={`/apps/invoice/preview/${row.title}`}>{`#${row.title}`}</StyledLink>
      )
    },

    {
      flex: 0.1,
      minWidth: 220,
      field: 'start',
      headerName: 'Debut',
      renderCell: ({ row }: Maintenance) => (
        <Typography
          variant='body2'
          sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
        >
          {formatTime(row.start)}
        </Typography>
      )
    },
    // {
    //   flex: 0.1,
    //   minWidth: 220,
    //   field: 'end',
    //   headerName: 'Fin',
    //   renderCell: ({ row }: Maintenance) => (
    //     <Typography
    //       variant='body2'
    //       sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
    //     >
    //       {row.end ? row.end : formatTime(new Date())}
    //     </Typography>
    //   )
    // },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'Temps',
      renderCell: ({ row }: Maintenance) => {
        const startTime = new Date(row.start)
        const endTime = row.end ? new Date(row.end) : new Date()
        const diffMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60))
        const hours = Math.floor(diffMinutes / 60)
        const minutes = diffMinutes % 60
        const formattedTime = `${hours}h ${minutes}min`

        return (
          <Typography
            variant='body2'
            sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px' }}
          >
            {formattedTime}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 120,
      field: 'Device_ID',
      headerName: 'Device_ID',

      renderCell: ({ row }: Maintenance) => (
        <CustomChip
          skin='light'
          label={row.Device_ID}
          sx={{
            height: 24,
            fontSize: '0.75rem',

            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
          }}
          onClick={() => {
            globalModel.impl.selector.setSelection([Number(row.Device_ID)], globalModel.model)
            globalModel.isolate(Number(row.Device_ID))
            globalModel.fitToView([Number(row.Device_ID)])
          }}
        />
      )
    },

    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: Maintenance) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Invoice'>
            <IconButton size='small'>
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Voir le rapport'>
            <IconButton size='small' component={Link} href={`${row.documents}`}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='mdi:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.title}`,
                icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='mdi:content-copy' fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }

    //   {
    //     flex: 0.2,
    //     minWidth: 200,
    //     field: 'description',
    //     headerName: 'Description',
    //     renderCell: ({ row }: Maintenance) => (
    //       <Typography
    //         variant='body2'
    //         sx={{ mb: -0.5, fontWeight: 600, lineHeight: 1.72, fontSize: '0.875rem', letterSpacing: '0.22px', number: 2 }}
    //       >
    //         {row.description}
    //       </Typography>
    //     )
    //   }
  ]
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    axios
      .get('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/done', {
        params: {
          q: value
        }
      })
      .then(response => setMaintenanceData(response.data.reverse()))
      .catch(error => {})
  }, [value])

  const handleBackDrop = () => {
    axios
      .get('https://clownfish-app-tugh2.ondigitalocean.app/maintenances/done')
      .then(response => setMaintenanceData(response.data.reverse()))
      .catch(error => {})
  }

  return (
    <Card>
      <CardHeader
        title='Historique des entretiens'
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Typography variant='body2' sx={{ mr: 2 }}>
          Search:
        </Typography>
        <TextField size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} />
      </Box>
      <DataGrid
        autoHeight
        hideFooter
        rows={maintenanceData}
        columns={columns1}
        disableSelectionOnClick
        pagination={true}
        getRowId={row => row._id}
        pageSize={8}
      />
      {/* <Button fullWidth variant='contained' sx={{ mt: 4 }} endIcon={<Icon icon='mdi:arrow-right' />}>
        Voir plus
      </Button> */}
    </Card>
  )
}

export default MaintenanceDonnee
