// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabContext, { useTabContext } from '@mui/lab/TabContext'

// ** Custom Components
import { FunctionComponent, PropsWithChildren, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Tabs, Tooltip } from '@mui/material'
import LevelsList from 'src/views/components/Viewer/LevelsList'
import TabList from '@mui/lab/TabList'
import SpacesList from 'src/views/components/Viewer/SpacesList'
import Icon from 'src/@core/components/icon'
import MainProgList from './maintenances/MaintProgList'
import MainNonProgList from './maintenances/MainNonProgList'
import ReclamClientNonTraitList from './maintenances/ReclamClientNonTraitList'
import ReclamClientTraitList from './maintenances/ReclamClientTraitList'
import AlertList from './maintenances/AlertList'
import ModelsList from 'src/views/components/Viewer/ModelsList'

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

const ReclamationDetails = (props: any) => {
  const { globalModel, specificModel } = props

  const [value, setValue] = useState<string>('0')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (globalModel) {
      setValue('0')
    }
  }, [globalModel])

  return (
    <Card className='infocardworkflow'>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='customized tabs example'
          variant='fullWidth'
          style={{
            maxHeight: '48px'
          }}
        >
          <CostumTab value='0' icon={<Icon icon='tabler:layers-intersect' fontSize={26} />} name='Models' />
          <CostumTab
            value='1'
            icon={<Icon icon='mdi:briefcase-variant-outline' fontSize={26} />}
            name='Maintenances Programmées'
          />
          <CostumTab value='2' icon={<Icon icon='mdi:alert' fontSize={26} />} name='Maintenances Non Programmées' />
          <CostumTab
            value='3'
            icon={<Icon icon='mdi:user-alert' fontSize={26} />}
            name='Reclamations Client Non Traitées'
          />
          <CostumTab
            value='4'
            icon={<Icon icon='mdi:account-check' fontSize={26} />}
            name='Reclamations Client Traitées'
          />
          <CostumTab value='5' icon={<Icon icon='mdi:alarm-light' fontSize={26} />} name='Alarmes' />
        </TabList>

        <TabPanel value='0' className='levellist'>
          {globalModel && <ModelsList viewer={globalModel} />}
        </TabPanel>
        <TabPanel value='1' className='levellist'>
          {globalModel && <MainProgList globalModel={globalModel} />}
        </TabPanel>
        <TabPanel value='2' className='levellist'>
          {globalModel && <MainNonProgList globalModel={globalModel} />}
        </TabPanel>
        <TabPanel value='3' className='levellist'>
          {globalModel && <ReclamClientNonTraitList globalModel={globalModel} />}
        </TabPanel>
        <TabPanel value='4' className='levellist'>
          {globalModel && <ReclamClientTraitList globalModel={globalModel} />}
        </TabPanel>
        <TabPanel value='5' className='levellist'>
          {globalModel && <AlertList globalModel={globalModel} />}
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ReclamationDetails
