import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Avatar, Button, ListItemAvatar, ListItemSecondaryAction } from '@mui/material'

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

export default function CustomizedSite(props: any) {
  const { data } = props
  const [expandedMain, setExpandedMain] = React.useState<string | false>('panel0')
  const [expandedIn, setExpandedIn] = React.useState<string | false>('panel00')

  const handleChangeMain = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedMain(newExpanded ? panel : false)
  }

  const handleChangeIn = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpandedIn(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion expanded={expandedMain === 'panel'} onChange={handleChangeMain('panel')}>
        {/* <AccordionSummary aria-controls={`panel${indexMain}d-content`} id={`panel${indexMain}d-header`}>
            <Typography>{item.name}</Typography>
          </AccordionSummary> */}
        <AccordionDetails>
          <Accordion expanded={expandedIn === 'panel'} onChange={handleChangeIn('panel')}>
            <AccordionSummary aria-controls={`paneld-content`} id={`paneld-header`}>
              <ListItemAvatar>
                <Avatar
                  src={'/images/icons/marker.png'}
                  alt='Caroline Black'
                  sx={{
                    width: 25,
                    height: 25,
                    '& img': { objectFit: 'contain' },
                    '& svg': { fontSize: 12 },
                    '& .MuiAvatar-root': { width: 25, height: 25 }
                  }}
                />
              </ListItemAvatar>
              <Typography>Name</Typography>
              <ListItemSecondaryAction>
                <div>
                  <Button variant='contained' size='small' onClick={() => {}}>
                    Visiter
                  </Button>
                </div>

                {/* <IconButton size='small'>
      <Icon icon='mdi:arrow-right' fontSize={20} onClick={handleOpen} />
    </IconButton> */}
              </ListItemSecondaryAction>
            </AccordionSummary>
            {/* <AccordionDetails>{item.component}</AccordionDetails> */}
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
