// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Country, State, City } from 'country-state-city'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

import jwt_decode from 'jwt-decode'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from '@mui/material'
import axios from 'axios'

import { render } from 'react-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import firebaseConfig from 'src/configs/firebase'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAddCard = (props: any) => {
  const { open, setOpen } = props

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        scroll='body'
        maxWidth='lg'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          {/* <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Ajouter un nouveau site
            </Typography>
            <Typography variant='body2'></Typography>
          </Box> */}
          <StepperAlternativeLabel />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogAddCard
