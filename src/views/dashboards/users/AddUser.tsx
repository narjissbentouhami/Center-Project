import {
  Avatar,
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
  Typography
} from '@mui/material'

import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/configs/firebase'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const AddUser = (props: any) => {
  const { open, setOpen } = props

  const handleClose = () => {
    setOpen(false)
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

  const [entreprise, setEntreprise] = useState<any>('')
  const [nom, setNom] = useState<string>('')
  const [prenom, setPrenom] = useState<string>('')
  const [telephone, setTelephone] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEntrepriseChange = (event: any) => {
    setEntreprise(event.target.value)
  }

  const handleNomChange = (event: any) => {
    setNom(event.target.value)
  }

  const handlePrenomChange = (event: any) => {
    setPrenom(event.target.value)
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

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const url_base = 'http://localhost:8000/'
  // const url_base = 'http://localhost:8000/'

  const submitUser = async () => {
    const res = await axios.post(url_base + 'users', {
      nom,
      prenom,
      entreprise,
      telephone,
      role,
      email,
      password,
      url
    })

    window.location.reload()
  }

  return (
    <>
      <Dialog fullWidth open={open} scroll='body' maxWidth='md' onClose={handleClose} onBackdropClick={handleClose}>
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Ajouter un nouveau utilisateur
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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Entreprise'
                // placeholder='Leonard'
                value={entreprise}
                onChange={handleEntrepriseChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Le Nom'
                // placeholder='Leonard'
                value={nom}
                onChange={handleNomChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
                autoFocus
                label='telephone'
                placeholder='06'
                value={telephone}
                onChange={handleTelephoneChange}
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
                type='email'
                label='Email'
                placeholder='user@email.com'
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                type='password'
                label='mot de passe'
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={2}>
              <Button
                variant='contained'
                disabled={
                  entreprise === '' ||
                  nom === '' ||
                  prenom === '' ||
                  role === '' ||
                  telephone === '' ||
                  email === '' ||
                  password === ''
                }
                onClick={submitUser}
                sx={{ marginLeft: '18%' }}
              >
                Ajouter
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddUser
