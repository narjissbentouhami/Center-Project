import { Fragment, useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import { Box, Button, Card, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

import { ThemeColor } from 'src/@core/layouts/types'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 6
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}
const statusObj: StatusObj = {
  traitée: { color: 'success' },
  'non traitée': { color: 'error' },
  'non traite': { color: 'error' }
}

interface TypeObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}
const typeObj: TypeObj = {
  electrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  électrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  Electrique: { color: 'info', icon: 'ic:outline-device-thermostat' },
  confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Confort: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Eau: { color: 'info', icon: 'material-symbols:water-drop' },
  Température: { color: 'warning', icon: 'ic:outline-device-thermostat' },
  Mobilier: { color: 'error', icon: 'mdi:desk-lamp-on' },
  IQA: { color: 'success', icon: 'mdi:air-filter' },
  Securité: { color: 'error', icon: 'material-symbols:lock' },
  Assenceur: { color: 'info', icon: 'ph:elevator-light' },
  Espacesverts: { color: 'success', icon: 'ion:leaf' },
  Déchets: { color: 'error', icon: 'ion:trash' },
  Ménage: { color: 'warning', icon: 'mdi:vacuum' },
  Autre: { color: 'primary', icon: 'mdi:dots-horizontal' },
  Climatisation: { color: 'info', icon: 'icon-park-solid:air-conditioning' }
}

const ReclamClientNonTraitList = (props: any) => {
  const [reclamationData, setReclamationData] = useState([])

  const [open, setOpen] = useState(false)
  const [obj, setObj] = useState({ name: '', idDev: '', description: '' })
  const [entretien, setEntretien] = useState({
    url: '',
    title: obj.name,
    start: '',
    end: '',
    allDay: false,
    Calendar: '',
    isCritical: false,
    Device_ID: obj.idDev,
    technicienID: '',
    modelID: '',
    description: obj.description,
    etat: 'en cours',
    affecte: true,
    documents: '',
    descriptionProleme: ''
  })

  const handleEntretien = () => {
    const dt = {
      url: 'http://localhost:8000/entretiens',
      title: obj.name,
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      allDay: false,
      Calendar: 'Alert',
      isCritical: false,
      Device_ID: obj.idDev,
      technicienID: entretien.technicienID,
      modeleID: '5f9f1b0b0b9b9c0017b0b0a6',
      description: 'test',
      etat: 'en cours',
      affecte: true,
      documents: 'test',
      descriptionProleme: ''
    }
    axios
      .post('http://localhost:8000/entretiens', dt)
      .then(response => console.log(response))
      .catch(error => console.log(error))
    console.log(dt)
    setOpen(false)
  }

  const handlesubmit = (name: any, idDev: any, description: any) => {
    setObj({ name: name, idDev: idDev, description: description })
    setEntretien({
      ...entretien,
      title: name,
      Device_ID: idDev,
      description: description,
      technicienID: entretien.technicienID
    })
    console.log({ name: name, idDev: idDev, description: description })
    setOpen(true)
  }
  const handleChange = (e: any) => {
    setEntretien({ ...entretien, [e.target.name]: e.target.value })
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/reclamation/nontraite')
      .then(response => {
        setReclamationData(response.data.data.reverse())
      })
      .catch(error => {})
  }, [])

  return (
    <Fragment>
      <List>
        {reclamationData.map((reclamation: any, index: number) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              sx={{
                p: 1
              }}
            >
              <CustomAvatar
                skin='light'
                color={typeObj[reclamation.type] ? typeObj[reclamation.type]?.color : 'primary'}
                sx={{ width: 30, height: 30, '& svg': { fontSize: '1rem' } }}
              >
                <Icon icon={typeObj[reclamation.type]?.icon} />
              </CustomAvatar>
              <ListItemText
                sx={{
                  '.MuiTypography-root': {
                    fontWeight: '500',
                    fontSize: 12,
                    marginLeft: '0.5rem'
                  }
                }}
                primary={reclamation.name}
              />
              <CustomChip
                skin='light'
                label={reclamation.status}
                color={statusObj[reclamation.status]?.color}
                sx={{
                  height: 24,
                  fontSize: '0.75rem',

                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 600, lineHeight: 1.4, msLineBreak: 'anywhere' }
                }}
                onClick={handlesubmit.bind(this, reclamation.name, reclamation.idDev)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
            Affecter l'intervention nomée <tr /> <span style={{ color: '#3F72AF' }}>" {obj.name} "</span> à un
            technicien
          </Typography>
          <br />
          {/* <Typography variant='h5' sx={{ mb: 3 }}>
            {obj.name}
          </Typography> */}
          {/* <Typography variant='h6' sx={{ mb: 3, marginTop: 3 }}>
            {obj.idDev}
          </Typography> */}
          <form>
            <TextField
              label='Identifiant de l intervenant'
              fullWidth
              value={entretien.technicienID}
              onChange={handleChange}
              name='technicienID'
              sx={{ mb: 3, marginTop: 3 }}
            />
            <TextField
              label='Date de l intervention'
              fullWidth
              value={entretien.start}
              onChange={handleChange}
              name='start'
              sx={{ mb: 3, marginTop: 3 }}
            />
            <Button variant='contained' onClick={handleEntretien} sx={{ mb: 3, marginTop: 3 }}>
              Valider
            </Button>
          </form>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default ReclamClientNonTraitList
