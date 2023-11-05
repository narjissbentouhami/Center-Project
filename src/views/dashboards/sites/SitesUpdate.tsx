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
  Stepper,
  StepLabel,
  Step,
  Card,
  CardContent,
  TableContainer,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import StepperWrapper from 'src/@core/styles/mui/stepper'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/configs/firebase'
import UploadDialog from 'src/pages/dashboards/uploaddocuments/UploadDialog'
import classes from 'src/pages/dashboards/uploaddocuments/style.module.css'
import { City, Country } from 'country-state-city'
import toast from 'react-hot-toast'
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'

const MODEL_BIM = [
  {
    title: 'Maquette BIM Federee'
  },
  {
    title: 'Maquette BIM Structure'
  },
  {
    title: 'Maquette BIM CVC'
  },
  {
    title: 'Maquette BIM Electricite'
  }
]

const PROJECT_FILES = [
  {
    title: 'Fiche technique'
  },
  {
    title: 'Contrats'
  },
  {
    title: 'Autres'
  }
]

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const steps = [
  {
    title: 'Nouveau Site',
    subtitle: 'Ajouter un nouveau site'
  },
  {
    title: 'Utilisateurs',
    subtitle: 'Gestion des utilisateurs'
  },
  {
    title: 'Documents',
    subtitle: 'Gestion Electronique des Documents'
  }
]

const SitesUpdate = (props: any) => {
  const { openEdit, setOpenEdit, siteEdit } = props

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  useEffect(() => {
    if (siteEdit) {
      setNameProjet(siteEdit.nameProjet)
      setMaitreOuvrage(siteEdit.maitreOuvrage)
      setAdresse(siteEdit.adresse)
      setVille(siteEdit.ville)
      setPays(siteEdit.pays)
      setCodePostal(siteEdit.codePostal)
      setTheLongitude(siteEdit.longitude)
      setTheLatitude(siteEdit.latitude)
      setType(siteEdit.type)
      setSelectedModels(siteEdit.models)
      // setBuildingNames(siteEdit.buildingNames)
      setImages(siteEdit.images)

      //   siteEdit.users.map((user: any) => {
      //     axios
      //       .get('https://clownfish-app-tugh2.ondigitalocean.app/users/' + user, {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      //         }
      //       })
      //       .then(res => {
      //         // console.log('res', res.data.data)
      //         setUsersData(res.data.data)
      //       })
      //   })
      //   setUsers(siteEdit.users)
    }
  }, [siteEdit])

  // const url_base = 'http://localhost:8000/'
  const url_base = 'http://localhost:8000/'

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  const [users, setUsers] = useState<any[]>([])
  const [usersData, setUsersData] = useState<any[]>([])

  //******************************************************Users */
  const [nom, setNom] = useState<string>('')
  const [prenom, setPrenom] = useState<string>('')
  const [telephone, setTelephone] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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

  const [number, setNumber] = useState<number>(2) // state to hold the number of buildings value

  //****************************************************Sites */
  const [nameProjet, setNameProjet] = useState('')
  const [maitreOuvrage, setMaitreOuvrage] = useState('')
  const [adresse, setAdresse] = useState('')
  const [ville, setVille] = useState('')
  const [allCities, setAllCities] = useState<
    { name: string; countryCode: string; stateCode: string; latitude: string; longitude: string }[]
  >([])

  const [pays, setPays] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [thelongitude, setTheLongitude] = useState('')
  const [thelatitude, setTheLatitude] = useState('')
  const [type, setType] = useState('')
  const [selectedModels, setSelectedModels] = useState<string[]>([])
  const [coordonnees, setCoordonnees] = useState('')
  const [buildingNames, setBuildingNames] = useState<string[]>([]) // state to hold the names of the buildings

  const handlenameProjetChange = (event: any) => {
    setNameProjet(event.target.value)
  }

  const handlenameClientChange = (event: any) => {
    setMaitreOuvrage(event.target.value)
  }

  const handleadresseChange = (event: any) => {
    setAdresse(event.target.value)
  }

  const handlevilleChange = (event: any) => {
    setVille(event.target.value)
  }

  // const handleCoordChange = (event: any) => {
  //   setCoordonnees(event.target.value)
  // }

  const handlepaysChange = (event: any) => {
    setPays(event.target.value)
    const thecount = Country.getAllCountries().find((item: any) => item.name === event.target.value)
    const thecities = thecount?.isoCode
      ? City.getAllCities().filter((item: any) => item.countryCode === thecount.isoCode)
      : []
    setAllCities(thecities)
  }

  const handlecodePostalChange = (event: any) => {
    setCodePostal(event.target.value)
  }

  const handlelongitudeChange = (event: any) => {
    setTheLongitude(event.target.value)
  }

  const handlelatitudeChange = (event: any) => {
    setTheLatitude(event.target.value)
  }

  const handletypeChange = (event: any) => {
    setType(event.target.value)
  }

  const handleModelChange = (event: any) => {
    const value = event.target.value
    const currentIndex = selectedModels.indexOf(value)
    const newSelectedModels = [...selectedModels]

    if (currentIndex === -1) {
      newSelectedModels.push(value)
    } else {
      newSelectedModels.splice(currentIndex, 1)
    }

    setSelectedModels(newSelectedModels)
  }

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(event.target.value)
    if (!isNaN(newNumber)) {
      setNumber(newNumber)
    } else {
      setNumber(2)
    }
  }

  const handleBuildingNameChange = (event: any, index: number) => {
    const newBuildingNames = [...buildingNames]
    newBuildingNames[index] = event.target.value
    setBuildingNames(newBuildingNames)
  }

  // generate the required number of text fields based on the number of buildings value
  const buildingNameFields: JSX.Element[] = []
  for (let i = 0; i < number; i++) {
    buildingNameFields.push(
      <Grid item xs={12} sm={12} key={i} sx={{ marginBottom: '5px' }}>
        <TextField
          fullWidth
          label={`Bâtiment ${i + 1}`}
          placeholder={`Bâtiment ${i + 1}`}
          value={buildingNames[i] || ''}
          onChange={e => handleBuildingNameChange(e, i)}
        />
      </Grid>
    )
  }

  const buildingFiles: JSX.Element[] = []
  for (let i = 0; i < number; i++) {
    buildingFiles.push(
      <Grid item xs={12} md={6}>
        <div className={classes.miniTitle}>{`Bâtiment ${i + 1}`}</div>
        <div className={classes.titleBim}>Maquette BIM</div>
        {MODEL_BIM.map((item, index) => (
          <UploadDialog key={index} title={item.title} />
        ))}
      </Grid>
    )
  }

  const [images, setImages] = useState<File[]>([])
  const [urls, setUrls] = useState<string[]>([])
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
      const uploadTask = uploadBytesResumable(ref(storage, `images/${image.name}`), image)
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
            const downloadUrl = await getDownloadURL(ref(storage, `images/${image.name}`))
            setUrls(prevState => [...prevState, downloadUrl])
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

  //************************* */
  const submitUser = async () => {
    const res = await axios.post(url_base + 'users', {
      nom,
      prenom,
      telephone,
      role,
      email,
      password
    })
    setUsers([...users, res.data.data._id])
    setUsersData([...usersData, res.data.data])

    setNom('')
    setPrenom('')
    setTelephone('')
    setRole('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async () => {
    const city = City.getAllCities().find((item: any) => item.name === ville)
    const { latitude = 0, longitude = 0 } = city ?? {}
    const response = await axios.put(
      `${url_base}site/${siteEdit._id}`,
      {
        nameProjet,
        maitreOuvrage,
        adresse,
        ville,
        pays,
        codePostal,
        latitude: parseFloat(thelatitude),
        longitude: parseFloat(thelongitude),
        type,
        users,
        coordonnees:
          (ville === 'Casablanca' ? '33.57311' : (latitude as string)) +
          ',' +
          (ville === 'Casablanca' ? '-7.589' : (longitude as string)),
        images: urls,
        models: selectedModels,
        buildingsName: buildingNames
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )
    window.location.reload()
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      handleSubmit()
      toast.success('Form Submitted')
    }
  }
  const handleReset = () => {
    setActiveStep(0)
  }

  //************************************************************************************************** */
  //************************************************************************************************** */
  //************************************************************************************************** */
  //************************************************************************************************** */
  //************************************************************************************************** */

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel id='demo-form-control-label-placement'>Type de site :</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name='position'
                  defaultValue='top'
                  value={type}
                  onChange={handletypeChange}
                >
                  <FormControlLabel value='Parc' control={<Radio />} label='Parc' />
                  <FormControlLabel value='Batiment' control={<Radio />} label='Bâtiment' />
                </RadioGroup>
              </FormControl>
            </Grid>
            {type === 'Parc' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    autoFocus
                    type='number'
                    value={number}
                    label='Nombre de batiments'
                    placeholder='2'
                    onChange={handleNumberChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {buildingNameFields}
                </Grid>
              </>
            )}
            {type === 'Batiment' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Bâtiment'
                  placeholder='Bâtiment'
                  value={buildingNames}
                  onChange={e => handleBuildingNameChange(e, 0)}
                />
              </Grid>
            )}
            {type === '' && <Grid item xs={12} sm={6}></Grid>}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Nom du Projet'
                type='text'
                label='Nom du Projet'
                // placeholder='Libellé du site'
                value={nameProjet}
                onChange={handlenameProjetChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Maitre d ouvrage'
                type='text'
                label='Maitre d ouvrage'
                // placeholder='Libellé du site'
                value={maitreOuvrage}
                onChange={handlenameClientChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Le Pays</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='Pays'
                  label='Pays'
                  // placeholder='Adresse du site'
                  value={pays}
                  onChange={handlepaysChange}
                >
                  {Country.getAllCountries().map((count: any, index: any) => (
                    <MenuItem key={index} value={count.name}>
                      {count.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>La Ville</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  name='Ville'
                  label='Ville'
                  // placeholder='Adresse du site'
                  value={ville}
                  onChange={handlevilleChange}
                >
                  {allCities.map((city: any, index: any) => (
                    <MenuItem key={index} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Adresse'
                type='text'
                label='Adresse'
                // placeholder='Adresse du site'
                value={adresse}
                onChange={handleadresseChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Code Postal'
                type='text'
                label='Code Postal'
                // placeholder='Adresse du site'
                value={codePostal}
                onChange={handlecodePostalChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='Coordonnées'
                    type='text'
                    label='Coordonnées'
                    // placeholder='Adresse du site'
                    value={coordonnees}
                    onChange={handleCoordChange}
                  />
                </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Latitude'
                type='number'
                label='Latitude'
                // placeholder='Adresse du site'
                value={thelatitude}
                onChange={handlelatitudeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name='Longitude'
                type='number'
                label='Longitude'
                // placeholder='Adresse du site'
                value={thelongitude}
                onChange={handlelongitudeChange}
              />
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
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
            <Grid item sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} onClick={submitUser}>
                Ajouter un utilisateur
              </Button>
            </Grid>
            <Grid item sm={3}></Grid>
            <TableContainer component={Paper}>
              <h3 style={{ textAlign: 'center' }}>La liste des utilisateurs</h3>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Avatar</TableCell>
                    <TableCell align='right'>Nom</TableCell>
                    <TableCell align='right'>Prenom</TableCell>
                    <TableCell align='right'>Email</TableCell>
                    <TableCell align='right'>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData?.map((user: any, index: any) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {/* <Avatar {...stringAvatar(`${user.nom}`)} /> */}
                        <Avatar alt={user.nom} src={user?.url} sx={{ width: 24, height: 24 }} />
                      </TableCell>
                      <TableCell align='right'>{user.nom}</TableCell>
                      <TableCell align='right'>{user.prenom}</TableCell>
                      <TableCell align='right'>{user.email}</TableCell>
                      <TableCell align='right'>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                marginLeft: '2rem',
                marginTop: '1rem'
              }}
            >
              <Grid container spacing={22}>
                {type === 'Batiment' && (
                  <Grid item xs={12} md={6}>
                    <div className={classes.miniTitle}>Batiment 1</div>
                    <div className={classes.titleBim}>Maquette BIM</div>
                    {MODEL_BIM.map((item, index) => (
                      <UploadDialog key={index} title={item.title} />
                    ))}
                  </Grid>
                )}
                {type === 'Parc' && buildingFiles}
                <Grid item xs={12} md={6}>
                  <div className={classes.titleDoc}>Documents du projet</div>
                  {PROJECT_FILES.map((item, index) => (
                    <UploadDialog key={index} title={item.title} />
                  ))}
                </Grid>
              </Grid>
            </Box>
            {/* ****************************************** partie test */}
            <Grid item xs={12} sm={12}>
              <Typography variant='h6'>Pour tester l'ajout : </Typography>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Model</InputLabel>
                <Select
                  name='model'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={selectedModels}
                  label='Model'
                  onChange={handleModelChange}
                  renderValue={selected => selected.join(', ')}
                >
                  <MenuItem value={'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0ZXkvQ05TLVBfSy1FTEVDLURPRS5ydnQ'}>
                    <Checkbox
                      checked={
                        selectedModels.indexOf(
                          'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0ZXkvQ05TLVBfSy1FTEVDLURPRS5ydnQ'
                        ) > -1
                      }
                    />
                    model Elec
                  </MenuItem>
                  <MenuItem value={'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0ZXkvQ05TLVBfSy1BUkMtRE9FLnJ2dA'}>
                    <Checkbox
                      checked={
                        selectedModels.indexOf(
                          'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVja2V0ZXkvQ05TLVBfSy1BUkMtRE9FLnJ2dA'
                        ) > -1
                      }
                    />
                    model ext
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div>
                <label className='form-label'>Ajouter des Photos : </label>
                <LinearProgress variant='determinate' value={progress} />

                <input type='file' multiple onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>

                <br />
                {urls.map((url, i) => (
                  <img
                    key={i}
                    style={{ width: '100px', margin: '2px' }}
                    src={url || 'http://via.placeholder.com/300'}
                    alt='firebase-image'
                  />
                ))}
              </div>
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>Toutes les étapes sont terminées !</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Réinitialiser
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Retour
              </Button>
              {activeStep === steps.length - 3 ? (
                <Button
                  size='large'
                  variant='contained'
                  onClick={handleNext}
                  disabled={
                    nameProjet === '' ||
                    type === '' ||
                    maitreOuvrage === '' ||
                    adresse === '' ||
                    // ville === '' ||
                    // pays === '' ||
                    codePostal === '' ||
                    thelatitude === '' ||
                    thelongitude === '' ||
                    buildingNames.length === 0
                  }
                >
                  Suivant
                </Button>
              ) : null}
              {activeStep === steps.length - 2 ? (
                <Button
                  size='large'
                  variant='contained'
                  onClick={handleNext}
                  // disabled={usersData.length === 0}
                >
                  Suivant
                </Button>
              ) : null}
              {activeStep === steps.length - 1 ? (
                <Button
                  size='large'
                  variant='contained'
                  onClick={handleNext}
                  // disabled={selectedModels.length === 0}
                >
                  Confirmer
                </Button>
              ) : null}
              {/* <Button size='large' variant='contained' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Confirmer' : 'Suivant'}
                  </Button> */}
            </Grid>
          </Grid>
        </form>
      )
    }
  }

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
        <DialogContent sx={{ pb: 3, px: { xs: 8, sm: 15 }, pt: 3, position: 'relative' }}>
          <IconButton size='small' onClick={handleCloseEdit} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
              Modifier ce site
            </Typography>
          </Box>
          <Fragment>
            <StepperWrapper>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => {
                  return (
                    <Step key={index}>
                      <StepLabel StepIconComponent={StepperCustomDot}>
                        <div className='step-label'>
                          <div>
                            <Typography className='step-title'>{step.title}</Typography>
                            <Typography className='step-subtitle'>{step.subtitle}</Typography>
                          </div>
                        </div>
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </StepperWrapper>
            <Card sx={{ mt: 4 }}>
              <CardContent>{renderContent()}</CardContent>
            </Card>
          </Fragment>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SitesUpdate
