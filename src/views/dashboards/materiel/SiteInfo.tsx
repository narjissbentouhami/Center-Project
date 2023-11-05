import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Avatar,
  Container,
  Divider
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { use, useEffect, useState } from 'react'

const SiteMateriel = (props: any) => {
  const { openMateriel, setOpenMateriel, infoMateriel } = props

  const handleCloseInfo = () => {
    setOpenMateriel(false)
  }

  // const url_base = 'http://localhost:8000/'
  const url_base = 'http://localhost:8000/'

  return (
    <>
      <Dialog
        fullWidth
        open={openMateriel}
        scroll='body'
        maxWidth='md'
        onClose={handleCloseInfo}
        onBackdropClick={handleCloseInfo}
      >
        <DialogContent sx={{ pb: 5, px: { xs: 8, sm: 15 }, pt: 5, position: 'relative' }}>
          <IconButton size='small' onClick={handleCloseInfo} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          {/* <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              {infoSite.nameProjet}
            </Typography>
          </Box> */}
          <Container>
            <Box sx={{ my: 4 }}>
              <Typography variant='h4' component='h1' gutterBottom>
                {/* {infoMateriel.name} */}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                {/* <strong>Maitre d'ouvrage:</strong> {infoMateriel.name} */}
              </Typography>
              <Divider />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body1' gutterBottom>
                    {/* <strong>Address:</strong> {infoMateriel.adresse}, {infoMateriel.ville}, {infoMateriel.pays},{' '} */}
                    {/* {infoMateriel.codePostal} */}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {/* <strong>Coordinates:</strong> {infoMateriel.latitude}, {infoMateriel.longitude} */}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {/* <strong>Type:</strong> {infoMateriel.type} */}
                  </Typography>
                  {/* {infoMateriel.type === 'Batiment' ? (
                    <Typography variant='body1' gutterBottom>
                      {/* <strong>Building Name:</strong> {infoMateriel.buildingsName[0]} */}
                  {/* </Typography> */}
                  {/* ) : infoMateriel.type === 'Parc' ? ( */}
                  <Typography variant='body1' gutterBottom>
                    {/* <strong>Building Names:</strong> {infoMateriel.buildingsName.join(', ')} */}
                  </Typography>
                  {/* ) : ( */}
                  <> </>
                  {/* )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body1' gutterBottom>
                    <strong>Images:</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* {infoMateriel?.images && */}
                    {/* infoMateriel?.images.map((image: any, index: any) => (
                        <Box key={index} sx={{ margin: 1 }}>
                          <Avatar
                            variant='square'
                            src={image}
                            alt={`project image ${index}`}
                            sx={{ width: 56, height: 56 }}
                          />
                        </Box>
                      ))} */}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

          <Grid container spacing={2}></Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SiteMateriel
