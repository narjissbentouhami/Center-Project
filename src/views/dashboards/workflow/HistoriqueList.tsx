// ** MUI Import
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import SendIcon from '@mui/icons-material/Send'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card, CardHeader, LinearProgress, Modal } from '@mui/material'
import { array } from 'yup'

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

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

// Styled component for the image of a shoe
const ImgShoe = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}))

const HistoriqueList = (props: any) => {
  const { globalModel, specificModel } = props
  const [open, setOpen] = useState(false)

  const url_base = 'http://localhost:8000/entretiens/device/'

  const [historique, setHistorique] = useState([])

  const handleClose = () => {
    setOpen(false)
  }
  const handlehistorique = () => {
    axios
      .get(url_base + JSON.stringify(globalModel?.getSelection()[0]))
      .then(response => setHistorique(response.data.reverse()))
      .catch(error => {})
    setOpen(true)
  }

  return (
    <Fragment>
      <div style={{ marginLeft: '29rem' }}>
        <Button
          variant='outlined'
          size='medium'
          aria-label='collapse'
          color='primary'
          onClick={() => handlehistorique()}
          endIcon={<SendIcon />}
          sx={{ marginLeft: '150px', marginRight: '16px' }}
        >
          Afficher l'historique des entretiens de ce périphérique
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ textAlign: 'center' }}>
            Historique des entretiens
          </Typography>
          <Timeline>
            {historique.map((item: any, index: any) => {
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color='success' />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                        {item?.title}
                      </Typography>
                      {/* <Typography variant='caption'>Wednesday</Typography> */}
                    </Box>
                    <Typography variant='body2' sx={{ color: 'text.primary' }}>
                      <span>{item.start.split('T')[0]}</span>
                      <Typography variant='caption'> à {item.start?.split('T')[1]?.substr(0, 5)}</Typography>
                      <Icon icon='mdi:arrow-right' fontSize={20} /> <span>{item.end?.split('T')[0]}</span>
                      <Typography variant='caption'> à {item.end?.split('T')[1]?.substr(0, 5)}</Typography>
                    </Typography>
                    <Typography variant='caption'>{item.description}</Typography>
                    {item.documents === '' ? (
                      <></>
                    ) : (
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                        <Button href={`${item.documents}`} color='secondary' target='_blank'>
                          Voir le Document
                        </Button>
                      </Box>
                    )}
                    {/* <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                      <Button href={`${item.documents}`} color='secondary' target='_blank'>
                        Voir le Document
                      </Button>
                    </Box> */}
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default HistoriqueList
