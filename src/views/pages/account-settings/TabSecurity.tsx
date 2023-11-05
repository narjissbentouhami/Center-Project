// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Demo Components
import CreateApiKey from 'src/views/pages/account-settings/security/CreateApiKey'
import ChangePasswordCard from 'src/views/pages/account-settings/security/ChangePasswordCard'
import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'
import axios from 'axios'
import { Button } from '@mui/material'

interface ApiKeyListType {
  id: string
  name: string
  category: string
  codeBIM: string
  docs: [string]
}

// const apiKeyList: ApiKeyListType[] = [
//   {
//     title: 'Server Key 1',
//     access: 'Full Access',
//     date: '28 Apr 2021, 18:20 GTM+4:10',
//     key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac'
//   },
//   {
//     title: 'Server Key 2',
//     access: 'Read Only',
//     date: '12 Feb 2021, 10:30 GTM+2:30',
//     key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99'
//   },
//   {
//     title: 'Server Key 3',
//     access: 'Full Access',
//     date: '28 Dec 2021, 12:21 GTM+4:10',
//     key: '2e915e59-3105-47f2-8838-6e46bf83b711'
//   }
// ]

const TabSecurity = () => {
  const [elements, setElements] = useState<ApiKeyListType[]>([])

  // const url_base = 'http://localhost:8000/'
  const url_base = 'http://localhost:8000/'

  useEffect(() => {
    axios.get(`${url_base}device`).then(res => {
      console.log(res.data.data)
      setElements(res.data.data)
    })
  }, [])
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid>
      <Grid item xs={12}>
        <CreateApiKey />
      </Grid> */}

      {/* API Key List & Access Card*/}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Fiches techniques des éléments' />
          <CardContent>
            {/* <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              An API key is a simple encrypted string that identifies an application without any principal. They are
              useful for accessing public data anonymously, and are used to associate API requests with your project for
              quota and billing.
            </Typography> */}
            <Grid container spacing={3}>
              {elements.map((item: any, index: any) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Box
                      key={index}
                      sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover', '&:not(:last-child)': { mb: 4 } }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6' sx={{ mr: 3 }}>
                          {item.name}
                        </Typography>
                        <CustomChip
                          size='small'
                          skin='light'
                          color='primary'
                          label={item.category}
                          sx={{ textTransform: 'uppercase' }}
                        />
                      </Box>
                      {/* <Box sx={{ my: 2.5, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 3, color: 'text.secondary', fontWeight: 600 }}>{item.codeBIM}</Typography>
                    <Box component='span' sx={{ display: 'flex', cursor: 'pointer', color: 'text.secondary' }}>
                      <Icon icon='mdi:content-copy' fontSize='1rem' />
                    </Box>
                  </Box> */}
                      {item?.docs?.map((doc: any, index: any) => {
                        return (
                          <Box key={index} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                            <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                            <Button href={`${doc}`} color='secondary' target='_blank'>
                              Voir le Document
                            </Button>
                          </Box>
                        )
                      })}
                      {/* {item.doc === '' ? (
                        <></>
                      ) : (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                          <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                          <Button href={`${item.docs}`} color='secondary' target='_blank'>
                            Voir le Document
                          </Button>
                        </Box>
                      )} */}
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Devices Card*/}
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Recent Devices' />
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'customColors.tableHeaderBg' }}>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Browser</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Device</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Location</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>Recent Activities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentDeviceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {row.browserIcon}
                        <Typography sx={{ whiteSpace: 'nowrap' }}>{row.browserName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.device}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.location}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
                        {row.date}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid> */}
    </Grid>
  )
}
export default TabSecurity
