// ** MUI Imports
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import SitesList from 'src/views/dashboards/sites/SitesList'
import DialogAddCard from 'src/views/pages/dialog-examples/DialogAddCard'

const SitesDashboard = (props: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <h3 style={{ textAlign: 'center' }}>Gestion des sites</h3>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant='contained' color='primary' onClick={handleOpen}>
            Ajouter un site
          </Button>
          <DialogAddCard open={open} setOpen={setOpen} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SitesList />
        </Grid>
      </Grid>
    </>
  )
}

export default SitesDashboard
