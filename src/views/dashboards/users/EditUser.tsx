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
  Avatar
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/configs/firebase'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const EditUser = (props: any) => {
  const { openEdit, setOpenEdit, userEdit } = props

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const [images, setImages] = useState<File[]>([])
  const [url, setUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)

  const handleChange = (e: any) => {
    const newImages = e.target.files
    for (let i = 0; i < newImages.length; i++) {
      newImages[i]['id'] = Math.random()
    }
    setImages(prevState => [...prevState, ...newImages])
  }
  const handleUpload = async () => {
    const promises: any[] = []
    images.forEach(image => {
      const uploadTask = uploadBytesResumable(ref(storage, `avatars/${image.name}`), image)
      promises.push(uploadTask)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(progress)
        },
        error => {
          console.log(error)
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(ref(storage, `avatars/${image.name}`))
            setUrl(downloadUrl)
          } catch (error) {
            console.log(error)
          }
        }
      )
    })

    Promise.all(promises)
      .then(() => alert('All images uploaded'))
      .catch(err => console.log(err))
  }

  const [nom, setNom] = useState<string>('')
  const [prenom, setPrenom] = useState<string>('')
  const [entreprise, setEntreprise] = useState<any>('')
  const [telephone, setTelephone] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Ajoutez un état pour chaque case à cocher
  const [maintenance, setMaintenance] = useState<boolean>(false)
  const [kpisEnergy, setKpisEnergy] = useState<boolean>(false)
  const [ged, setGed] = useState<boolean>(false)
  const [gtc, setGtc] = useState<boolean>(false)
  const [interfaceMaintenance, setInterfaceMaintenance] = useState<boolean>(false)
  const [spaceManagement, setSpaceManagement] = useState<boolean>(false)
  const [appMobile, setAppMobile] = useState<boolean>(false)

  const handleNomChange = (event: any) => {
    setNom(event.target.value)
  }

  const handlePrenomChange = (event: any) => {
    setPrenom(event.target.value)
  }

  const handleEntrepriseChange = (event: any) => {
    setEntreprise(event.target.value)
  }

  const handleTelephoneChange = (event: any) => {
    setTelephone(event.target.value)
  }

  const handleRoleChange = (event: any) => {
    setRole(event.target.value)
  }

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value)
  }

  // Ajoutez un gestionnaire d'événements pour chaque case à cocher
  const handleMaintenanceChange = (event: any) => {
    setMaintenance(event.target.checked)
  }

  const handleKpisEnergyChange = (event: any) => {
    setKpisEnergy(event.target.checked)
  }

  const handleGedChange = (event: any) => {
    setGed(event.target.checked)
  }

  const handleGtcChange = (event: any) => {
    setGtc(event.target.checked)
  }

  const handleInterfaceMaintenanceChange = (event: any) => {
    setInterfaceMaintenance(event.target.checked)
  }

  const handleSpaceManagementChange = (event: any) => {
    setSpaceManagement(event.target.checked)
  }

  const handleAppMobileChange = (event: any) => {
    setAppMobile(event.target.checked)
  }

  // const url_base = 'http://localhost:8000/'
  const url_base = 'http://localhost:8000/'

  const submitUser = async () => {
    const res = await axios.put(url_base + 'users/' + userEdit._id, {
      nom,
      prenom,
      telephone,
      entreprise,
      role,
      email,
      maintenance: maintenance.toString(),
      kpisEnergy: kpisEnergy.toString(),
      ged: ged.toString(),
      gtc: gtc.toString(),
      interfaceMaintenance: interfaceMaintenance.toString(),
      spaceManagement: spaceManagement.toString(),
      appMobile: appMobile.toString(),
      url
    })
    window.location.reload()
  }

  useEffect(() => {
    setNom(userEdit.nom)
    setPrenom(userEdit.prenom)
    setEntreprise(userEdit.entreprise)
    setTelephone(userEdit.telephone)
    setRole(userEdit.role)
    setEmail(userEdit.email)
    setMaintenance(userEdit.maintenance ? JSON.parse(userEdit.maintenance) : false)
    setKpisEnergy(userEdit.kpisEnergy ? JSON.parse(userEdit.kpisEnergy) : false)
    setGed(userEdit.ged ? JSON.parse(userEdit.ged) : false)
    setGtc(userEdit.gtc ? JSON.parse(userEdit.gtc) : false)
    setInterfaceMaintenance(userEdit.interfaceMaintenance ? JSON.parse(userEdit.interfaceMaintenance) : false)
    setSpaceManagement(userEdit.spaceManagement ? JSON.parse(userEdit.spaceManagement) : false)
    setAppMobile(userEdit.appMobile ? JSON.parse(userEdit.appMobile) : false)
    setUrl(userEdit.url)
  }, [userEdit])

  return (
    <>
      <Dialog
        fullWidth
        open={openEdit}
        scroll='body'
        maxWidth='md'
        onClose={handleCloseEdit}
        onBackdropClick={handleCloseEdit}
      >
        <DialogContent sx={{ pb: 5, px: { xs: 8, sm: 15 }, pt: 5, position: 'relative' }}>
          <IconButton size='small' onClick={handleCloseEdit} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Modifier cet utilisateur
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4.5} />
            <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
              <input
                accept='image/*'
                id='avatarUpdate'
                type='file'
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <label htmlFor='avatarUpdate'>
                <IconButton component='span'>
                  <Avatar
                    src={url}
                    style={{
                      width: '50px',
                      height: '50px'
                    }}
                  />
                </IconButton>
              </label>
              <Typography variant='body2'>Cliquer sur l'avatar</Typography>
              <br />
              <Button size='small' onClick={handleUpload}>
                Upload
              </Button>
            </Grid>
            <Grid item xs={12} sm={4.5} />
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Le Nom'
                // placeholder='Leonard'
                value={nom}
                onChange={handleNomChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Le Prénom'
                // placeholder='Carter'
                value={prenom}
                onChange={handlePrenomChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Entreprise'
                // placeholder='Carter'
                value={entreprise}
                onChange={handleEntrepriseChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  value={role}
                  label='Role'
                  onChange={handleRoleChange}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                >
                  <MenuItem value='Super_Administrateur'>Super Administrateur</MenuItem>
                  <MenuItem value='Administrateur'>Administrateur</MenuItem>
                  <MenuItem value='Responsable_maintenance'>Responsable de maintenance</MenuItem>
                  <MenuItem value='Technicien'>Technicien</MenuItem>
                  <MenuItem value='Responsable_client'>Responsable chez client</MenuItem>
                  <MenuItem value='Utilisateur_final'>Utilisateur final</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                label='telephone'
                placeholder='06'
                value={telephone}
                onChange={handleTelephoneChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                type='email'
                label='Email'
                placeholder='user@email.com'
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align='center'
                      colSpan={7}
                      sx={{
                        backgroundColor: '#13538A',
                        color: 'white',
                        textAlign: 'center'
                      }}
                    >
                      Accès de l'utilisateur
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='right' sx={{ backgroundColor: '#3EDAD8', color: 'white', textAlign: 'center' }}>
                      Maintenance module
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#3ed7da', color: 'white', textAlign: 'center' }}>
                      KPIS Energy module
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#37C9EF', color: 'white', textAlign: 'center' }}>
                      GED module
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#2C92D5', color: 'white', textAlign: 'center' }}>
                      GTC permissions
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#00679C', color: 'white', textAlign: 'center' }}>
                      Interface maintenance
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#036885', color: 'white', textAlign: 'center' }}>
                      Space Management module
                    </TableCell>
                    <TableCell align='right' sx={{ backgroundColor: '#545454', color: 'white', textAlign: 'center' }}>
                      Mobile APP
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={maintenance} onChange={handleMaintenanceChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={kpisEnergy} onChange={handleKpisEnergyChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={ged} onChange={handleGedChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={gtc} onChange={handleGtcChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={interfaceMaintenance} onChange={handleInterfaceMaintenanceChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={spaceManagement} onChange={handleSpaceManagementChange} />
                  </TableCell>
                  <TableCell align='right' sx={{ textAlign: 'center' }}>
                    <Checkbox checked={appMobile} onChange={handleAppMobileChange} />
                  </TableCell>
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={2}>
              <Button
                variant='contained'
                disabled={
                  entreprise === '' || nom === '' || prenom === '' || role === '' || telephone === '' || email === ''
                }
                onClick={submitUser}
                sx={{ marginLeft: '18%' }}
              >
                Modifier
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditUser
