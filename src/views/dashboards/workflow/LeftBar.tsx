// ** MUI Imports
import Card from '@mui/material/Card'
import { Button, Grid, Input, InputAdornment, Tabs, TextField, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import CrmAlertUpgrade from '../crm/CrmAlert'

const LeftBar = (props: any) => {
  const [search, setSearch] = useState<any>('Rechercher')
  const { globalModel, specificModel } = props
  return (
    <>
      <Card className='infocard'>
        <div
          style={{
            width: '90%',
            margin: 'auto'
          }}
        >
          <TextField
            variant='outlined'
            id='input-with-icon-grid'
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='material-symbols:search' fontSize={26} style={{ color: '#BDBDBD' }} />
                </InputAdornment>
              )
            }}
            sx={{
              marginTop: '10px'
            }}
            size='small'
          />
          <Grid item xs={12} md={15}>
            {globalModel && <CrmAlertUpgrade globalModel={globalModel} specificModel={specificModel} />}
          </Grid>
          {/* <Grid item sx={{ '& svg': { color: 'action.active' } }}>
            <Icon icon='material-symbols:search' />
          </Grid>
          <Grid item sx={{ width: '70%' }}>
            <TextField variant='standard' id='input-with-icon-grid' label='Rechercher' />
          </Grid> */}
        </div>
      </Card>
    </>
  )
}

export default LeftBar
