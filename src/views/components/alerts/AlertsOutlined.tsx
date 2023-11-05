// ** MUI Imports
import { Box, Button, CardHeader, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/configs/firebase'
import { formatTime } from 'src/utils/date'
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
  maxHeight: '80vh',
  overflowY: 'auto'
}

const AlertsOutlined = () => {
  const [data, setData] = useState([])
  const [desc, setDesc] = useState([])
  const [open, setOpen] = useState(false)
  const [theId, setId] = useState('')
  const [dataM, setDataM] = useState([])
  const [openn, setOpenn] = useState(false)
  const [opennn, setOpennn] = useState(false)
  const [opennnn, setOpennnn] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:8000/entretiens/encours')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:8000/maintenances/encours')
      .then(response => {
        setDataM(response.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  //handleIconClick to update the field etat to done with put request
  const handleIconClick = () => {
    axios
      // .put('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/documents/' + theId, {
      .put('http://localhost:8000/entretiens/documents/' + theId, {
        documents: urls,
        etat: 'Done'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
    setOpen(false)
  }

  const handleIconClickk = () => {
    axios
      // .put('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/documents/' + theId, {
      .put('http://localhost:8000/maintenances/documents/' + theId, {
        documents: urls,
        etat: 'Done'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
    setOpenn(false)
  }

  // const handleBackDrop = () => {
  //   axios
  //     .get('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/encours')
  //     .then(response => setData(response.data.reverse()))
  //     .catch(error => {})
  // }
  const handleIconClickA = () => {
    axios
      // .put('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/documents/' + theId, {
      .put('http://localhost:8000/entretiens/attente/' + theId, {
        descriptionProbleme: desc,
        etat: 'En attente'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
    setOpen(false)
  }
  const handleIconClickAA = () => {
    axios
      .put('http://localhost:8000/maintenances/attente/' + theId, {
        // .put('http://localhost:8000/maintenances/attente/' + theId, {
        descriptionProbleme: desc,
        etat: 'En attente'
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
    setOpen(false)
  }

  const handleOpen = (id: any) => {
    setId(id)
    setOpen(true)
  }
  const handleOpenn = (id: any) => {
    setId(id)
    setOpenn(true)
  }
  const handleOpennn = (id: any) => {
    setId(id)
    setOpennn(true)
  }
  const handleOpennnn = (id: any) => {
    setId(id)
    setOpennnn(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClosee = () => {
    setOpenn(false)
  }
  const handleCloseee = () => {
    setOpennn(false)
  }
  const handleCloseeee = () => {
    setOpennnn(false)
  }

  const [images, setImages] = useState<File[]>([])
  const [urls, setUrls] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)

  const handleChangee = (e: any) => {
    setDesc(e.target.value)
  }

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
      const uploadTask = uploadBytesResumable(ref(storage, `docs/${image.name}`), image)
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
            const downloadUrl = await getDownloadURL(ref(storage, `docs/${image.name}`))
            setUrls(prevState => [...prevState, downloadUrl])
          } catch (error) {
            console.log(error)
          }
        }
      )
    })

    Promise.all(promises)
      .then(() => alert('File uploaded'))
      .catch(err => console.log(err))
  }

  return (
    <div className='demo-space-y'>
      {/* <CardHeader
        title='Liste des Entretiens en attente de validation'
        action={
          <IconButton
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
            onClick={() => handleBackDrop()}
          >
            <Icon icon='mdi:refresh' fontSize={20} />
          </IconButton>
        }
      /> */}
      {data?.map((row: any) => (
        <Alert
          // variant='outlined'
          severity='error'
          key={row._id}
          action={
            <div>
              <IconButton
                size='small'
                color='inherit'
                aria-label='success'
                onClick={() => {
                  console.log(row._id)
                  handleOpen(row._id)
                }}
              >
                <Icon icon='mdi:success' fontSize='inherit' />
              </IconButton>
              <IconButton
                size='small'
                color='inherit'
                aria-label='success'
                onClick={() => {
                  console.log(row._id)
                  handleOpennn(row._id)
                }}
              >
                <Icon icon='mdi:clock' fontSize='inherit' />
              </IconButton>
            </div>
          }
        >
          {row.title} De l'élément : "{row.Device_ID}" le :{formatTime(row.start)}
          {/* <IconButton
            onClick={() => handleIconClick(row)}
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
          ></IconButton> */}
        </Alert>
      ))}
      {dataM?.map((row: any) => (
        <Alert
          // variant='outlined'
          color='warning'
          //severity='warning'
          key={row._id}
          action={
            <div>
              <IconButton
                size='small'
                color='inherit'
                aria-label='success'
                onClick={() => {
                  console.log(row._id)
                  handleOpenn(row._id)
                }}
              >
                <Icon icon='mdi:success' fontSize='inherit' />
              </IconButton>
              <IconButton
                size='small'
                color='inherit'
                aria-label='success'
                onClick={() => {
                  console.log(row._id)
                  handleOpennnn(row._id)
                }}
              >
                <Icon icon='mdi:clock' fontSize='inherit' />
              </IconButton>
            </div>
          }
        >
          {row.title} De l'élément : "{row.Device_ID}" le :{formatTime(row.start)}
        </Alert>
      ))}
      {/* <Alert
        variant='outlined'
        severity='warning'
        action={
          <IconButton size='small' color='inherit' aria-label='success'>
            <Icon icon='mdi:success' fontSize='inherit' />
          </IconButton>
        }
      >
        Entretien climatiseur programmé
      </Alert> */}
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            className='form-label'
            variant='caption'
            sx={{
              color: 'text.disabled',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '1.5rem'
            }}
          >
            Ajouter des fichiers :
          </Typography>
          <br />
          <LinearProgress variant='determinate' value={progress} />
          <br />
          <input type='file' multiple onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleIconClick}>Confirmer</Button>
            <Button onClick={handleClose} color='secondary'>
              annuler
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openn}>
        <Box sx={style}>
          <Typography
            className='form-label'
            variant='caption'
            sx={{
              color: 'text.disabled',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '1.5rem'
            }}
          >
            Ajouter des fichiers :
          </Typography>
          <br />
          <LinearProgress variant='determinate' value={progress} />
          <br />
          <input type='file' multiple onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleIconClickk}>Confirmer</Button>
            <Button onClick={handleClosee} color='secondary'>
              annuler
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={opennn}>
        <Box sx={style}>
          <Typography
            className='form-label'
            variant='caption'
            sx={{
              color: 'text.disabled',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '1.5rem'
            }}
          >
            Justifier en détail le problème :{' '}
          </Typography>
          <LinearProgress variant='determinate' value={progress} />

          <input type='text' multiple onChange={handleChangee} value={desc} />

          <br />
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleIconClickA}>Confirmer</Button>
            <Button onClick={handleCloseee} color='secondary'>
              annuler
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={opennnn}>
        <Box sx={style}>
          <Typography
            className='form-label'
            variant='caption'
            sx={{
              color: 'text.disabled',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              fontSize: '1.5rem'
            }}
          >
            Justifier le problème rencontré:
          </Typography>
          {/* <LinearProgress variant='determinate' value={progress} /> */}
          <br />

          <TextField
            multiline
            rows={4}
            variant='outlined'
            onChange={handleChangee}
            value={desc}
            label='Justifier en détail le problème'
            color='primary'
            fullWidth
          />

          <br />
          <div style={{ textAlign: 'center' }}>
            <Button onClick={handleIconClickAA}>Confirmer</Button>
            <Button onClick={handleCloseeee} color='secondary'>
              annuler
            </Button>
          </div>
        </Box>
      </Modal>
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} color='error'>
          <IconButton color='error' aria-label='error' title='hh'>
            <Icon icon='mdi:error' fontSize={20} />
          </IconButton>
          Liste des entretiens curatifs en attente de validation
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} color='yellow'>
          <IconButton color='warning' aria-label='warning' title='hh'>
            <Icon icon='mdi:checkbox-marked-circle-outline' fontSize={20} />
          </IconButton>
          Liste des entretiens programmés en attente de validation
        </Typography>
      </Box>
    </div>
  )
}

export default AlertsOutlined
