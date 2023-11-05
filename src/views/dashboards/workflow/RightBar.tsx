// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabContext, { useTabContext } from '@mui/lab/TabContext'

// ** Custom Components
import { Fragment, FunctionComponent, PropsWithChildren, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Grid, Input, Tabs, TextField, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import palette from 'src/@core/theme/palette'
import LevelsList from 'src/views/components/Viewer/LevelsList'
import MainNonProgList from './maintenances/MainNonProgList'
import AlertList from './maintenances/AlertList'
import MaintGlobal from './maintenances/MaintGlobal'
import MainProgList from './maintenances/MaintProgList'
import ReclamClientNonTraitList from './maintenances/ReclamClientNonTraitList'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

const TabPanel: FunctionComponent<PropsWithChildren<any>> = (props: any) => {
  const { value: contextValue } = useTabContext() || {}
  return (
    <Box sx={{ display: props.value === contextValue ? 'block' : 'none' }} key={props.value} {...props}>
      {props.children}
    </Box>
  )
}

const CostumTab = (props: any) => {
  const { value, icon, name, label, ...other } = props
  return (
    <Tooltip title={name}>
      <Tab
        className='tab'
        value={value}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <Typography sx={{ ml: 1 }}>{label}</Typography>
          </Box>
        }
        {...other}
      />
    </Tooltip>
  )
}

const RightBar = (props: any) => {
  const { globalModel, setNbrSpace } = props
  const [expanded, setExpanded] = useState(false)

  // const handleClick = () => {
  //   setExpanded(!expanded)
  // }
  const [open1, setOpen1] = useState<any>([])
  const [open2, setOpen2] = useState<any>([])
  const [open3, setOpen3] = useState<any>([])
  const [open4, setOpen4] = useState<any>([])
  const [open5, setOpen5] = useState<any>([])
  const [properties, setProperties] = useState<any>()
  const [generalInfo, setGeneralInfo] = useState<any>([])

  const handleClick1 = (index: any) => {
    let newOpen = [...open1]
    newOpen[index] = !newOpen[index]
    setOpen1(newOpen)
  }
  const handleClick2 = (index: any) => {
    let newOpen = [...open2]
    newOpen[index] = !newOpen[index]
    setOpen2(newOpen)
  }
  const handleClick3 = (index: any) => {
    let newOpen = [...open3]
    newOpen[index] = !newOpen[index]
    setOpen3(newOpen)
  }
  const handleClick4 = (index: any) => {
    let newOpen = [...open4]
    newOpen[index] = !newOpen[index]
    setOpen4(newOpen)
  }
  const handleClick5 = (index: any) => {
    let newOpen = [...open5]
    newOpen[index] = !newOpen[index]
    setOpen5(newOpen)
  }
  const handleclickButton = () => {
    window.open('/apps/calendar/', '_self')
  }
  const handleclickButtonRec = () => {
    window.open('/dashboards/reclamation/', '_self')
  }
  const renderGeneralInfo1 = () => {
    let index = 1235
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick1(index)}
            sx={{
              p: 2,
              width: '10%'
            }}
            style={{
              marginLeft: '1rem',
              marginTop: '10px',
              // backgroundColor: '#1f6f78',
              backgroundColor: '#036885',
              width: '10%',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1,
                color: '#fff'
              }}
            >
              <Icon icon={open1[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'Calendrier'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#fff'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse
          in={open1[index]}
          timeout='auto'
          unmountOnExit
          key={'propertycollapse' + index}
          sx={{ marginLeft: '1rem' }}
        >
          <Button onClick={handleclickButton}>
            Programmer un nouvel entretien
            <Icon fontSize={20} icon='mdi:arrow-right-bold' />
          </Button>
          {globalModel && <MainProgList globalModel={globalModel} />}
        </Collapse>
      </>
    )
  }
  const renderGeneralInfo2 = () => {
    let index = 1235
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick2(index)}
            sx={{
              p: 2,
              width: '50%'
            }}
            style={{
              marginLeft: '1rem',
              marginTop: '10px',
              // backgroundColor: '#248888',
              backgroundColor: '#036885',
              width: '10%',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1,
                color: '#fff'
              }}
            >
              <Icon icon={open2[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'Missions en cours'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#fff'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open2[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
          {globalModel && <MainNonProgList globalModel={globalModel} />}
        </Collapse>
      </>
    )
  }
  const renderGeneralInfo3 = () => {
    let index = 1235
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick3(index)}
            sx={{
              p: 2,
              width: '50%'
            }}
            style={{
              marginLeft: '1rem',
              marginTop: '10px',
              // backgroundColor: '#118a7e',
              backgroundColor: '#036885',
              width: '10%',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1,
                color: '#fff'
              }}
            >
              <Icon icon={open3[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'Alertes GTC'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#fff'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open3[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
          {globalModel && <AlertList globalModel={globalModel} />}
        </Collapse>
      </>
    )
  }
  const renderGeneralInfo4 = () => {
    let index = 1235
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick4(index)}
            sx={{
              p: 2,
              width: '50%'
            }}
            style={{
              marginLeft: '1rem',
              marginTop: '10px',
              // backgroundColor: '#3baea0',
              backgroundColor: '#036885',
              width: '10%',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1,
                color: '#fff'
              }}
            >
              <Icon icon={open4[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'Requêtes FM Utilisateurs'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#fff'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse
          in={open4[index]}
          timeout='auto'
          unmountOnExit
          key={'propertycollapse' + index}
          sx={{ marginLeft: '1rem' }}
        >
          <Button onClick={handleclickButtonRec}>
            {' '}
            Voir plus de détails
            <Icon fontSize={20} icon='mdi:eye-arrow-right-outline' />
          </Button>
          {globalModel && <ReclamClientNonTraitList globalModel={globalModel} />}
        </Collapse>
      </>
    )
  }
  const renderGeneralInfo5 = () => {
    let index = 1235
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick5(index)}
            sx={{
              p: 2,
              width: '50%'
            }}
            style={{
              marginLeft: '1rem',
              marginTop: '10px',
              // backgroundColor: '#9fd3c7',
              backgroundColor: '#036885',
              width: '10%',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1,
                color: '#fff'
              }}
            >
              <Icon icon={open5[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'Historique de maintenance'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '700',
                  fontSize: 12,
                  color: '#fff'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open5[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
          {globalModel && <MaintGlobal globalModel={globalModel} />}
        </Collapse>
      </>
    )
  }

  return (
    <>
      <Card className='infocard'>
        <PerfectScrollbar>
          <Grid
            container
            spacing={2}
            alignItems='flex-end'
            style={{
              marginBottom: '1rem',
              marginTop: '1rem'
            }}
          >
            {renderGeneralInfo1()}

            {renderGeneralInfo2()}
            {renderGeneralInfo3()}
            {renderGeneralInfo4()}
            {renderGeneralInfo5()}
          </Grid>
        </PerfectScrollbar>
      </Card>
    </>
  )
}

export default RightBar
