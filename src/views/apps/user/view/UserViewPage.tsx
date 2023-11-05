// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

const UserView = ({ tab, invoiceData }: Props) => {
  const [globalModel, setGlobalModel] = useState<any>(null)
  useEffect(() => {
    window.location.hash = '?batimentId=Parcelle K'
  }, [])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={5}>
        <UserViewLeft setGlobalModelProp={(model: any) => setGlobalModel(model)} />
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <UserViewRight tab={tab} invoiceData={invoiceData} globalModel={globalModel} />
      </Grid>
    </Grid>
  )
}

// UserView.authGuard = true
// UserView.acl = {
//   subject: 'interface',
//   action: 'interfaceMaintenance'
// }

export default UserView
