import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

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

export default function CustomizedAccordions(props: any) {
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
      {data.map((item: any, indexMain: any) => (
        <Accordion
          expanded={expandedMain === 'panel' + indexMain}
          onChange={handleChangeMain('panel' + indexMain)}
          key={indexMain}
        >
          <AccordionSummary
            aria-controls={`panel${indexMain}d-content`}
            id={`panel${indexMain}d-header`}
            className='panel-header'
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Array.isArray(item.children)
              ? item.children.map((item: any, indexIn: any) => (
                  <Accordion
                    expanded={expandedIn === 'panel' + indexMain + indexIn}
                    onChange={handleChangeIn('panel' + indexMain + indexIn)}
                    key={indexMain + '' + indexIn}
                  >
                    <AccordionSummary
                      aria-controls={`panel${indexMain}${indexIn}d-content`}
                      id={`panel${indexMain}${indexIn}d-header`}
                    >
                      <Typography>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>{item.component}</AccordionDetails>
                  </Accordion>
                ))
              : item.children}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
