// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List, { ListProps } from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import axios from 'axios'
import { Children, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  Modal
} from '@mui/material'
import CustomizedAccordions from 'src/pages/components/accordion/CustomizedAccordation'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import CustomizedSite from 'src/pages/components/accordion/CustomizedSite'
import { ba } from '@fullcalendar/core/internal-common'
import { set } from 'nprogress'
// Futuristic scrollbar style
const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '5px'
    // backgroundColor: '#F5F5F5'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(45deg, #036885 30%, #2B7A6D 90%)',
    borderRadius: '10px'
  }
}

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  ...scrollBar,
  '& .MuiListItem-container': {
    width: '-webkit-fill-available',
    backgroundColor: '#fff',
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const ListSites = () => {
  const [sites, setSites] = useState([])
  const [open, setOpen] = useState(false)
  // const url_base = 'http://localhost:8000/'
  const url_base = 'http://localhost:8000/'

  // decoded token
  const decodedToken: any = jwt_decode(localStorage.getItem('accessToken') || '')
  const afficherSites = () => {
    axios.get(url_base + 'site/' + decodedToken._id).then(res => {
      // console.log('res', res.data)
      setSites(res.data.data)
    })
  }

  const [bats, setBats] = useState<any>([])
  const listBat = (batiments: any) => {
    let batStock: string[] = []
    batiments.map((batiment: any) => {
      axios.get(url_base + 'batiment/findByName/' + batiment).then(res => {
        batStock.push(res.data.data)
      })
    })

    setBats(batStock)
    // console.log('bats', batStock)
  }

  useEffect(() => {
    afficherSites()
  }, [bats])
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [expanded, setExpanded] = useState(false)

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  const [openFirst, setOpenFirst] = useState(false)
  const [openSecond, setOpenSecond] = useState(false)
  const [openThird, setOpenThird] = useState(false)
  const [showExtraContent, setShowExtraContent] = useState(false)
  const [showExtraContent1, setShowExtraContent1] = useState(false)
  const [showExtraContent2, setShowExtraContent2] = useState(false)
  const [showExtraContent3, setShowExtraContent3] = useState(false)
  const [showExtraContent4, setShowExtraContent4] = useState(false)
  const [showExtraContent5, setShowExtraContent5] = useState(false)
  const [showExtraContent6, setShowExtraContent6] = useState(false)
  const [showExtraContent7, setShowExtraContent7] = useState(false)
  const [showExtraContent8, setShowExtraContent8] = useState(false)
  const [showExtraContent9, setShowExtraContent9] = useState(false)
  const [showExtraContent10, setShowExtraContent10] = useState(false)

  const toggleFirst = () => {
    setOpenFirst(!openFirst)
    setOpenSecond(false)
    setShowExtraContent(false)
  }

  const toggleSecond = () => {
    setOpenSecond(!openSecond)
    setShowExtraContent(false)
  }

  const toggleThird = () => {
    setOpenThird(!openThird)
    setShowExtraContent(false)
  }

  const toggleShowExtraContent = () => {
    setShowExtraContent(!showExtraContent)
  }
  const toggleShowExtraContent1 = () => {
    setShowExtraContent1(!showExtraContent1)
  }
  const toggleShowExtraContent2 = () => {
    setShowExtraContent2(!showExtraContent2)
  }
  const toggleShowExtraContent3 = () => {
    setShowExtraContent3(!showExtraContent3)
  }
  const toggleShowExtraContent4 = () => {
    setShowExtraContent4(!showExtraContent4)
  }
  const toggleShowExtraContent5 = () => {
    setShowExtraContent5(!showExtraContent5)
  }
  const toggleShowExtraContent6 = () => {
    setShowExtraContent6(!showExtraContent6)
  }
  const toggleShowExtraContent7 = () => {
    setShowExtraContent7(!showExtraContent7)
  }
  const toggleShowExtraContent8 = () => {
    setShowExtraContent8(!showExtraContent8)
  }
  const toggleShowExtraContent9 = () => {
    setShowExtraContent9(!showExtraContent9)
  }
  const toggleShowExtraContent10 = () => {
    setShowExtraContent10(!showExtraContent10)
  }

  return (
    <div>
      <div>
        <Button onClick={toggleFirst} variant='contained' style={{ backgroundColor: '#393e46' }}>
          Bouygues (Anfa 3B2I)
        </Button>
        <Collapse in={openFirst}>
          <div style={{ marginLeft: 20 }}>
            {/* #929aab */}
            <div>
              <Button onClick={toggleSecond} variant='contained' color='secondary'>
                Faubourgs d'Anfa T1
              </Button>
              <Collapse in={openSecond}>
                <div style={{ marginLeft: 20 }}>
                  {openSecond && (
                    <div>
                      <Button
                        onClick={toggleShowExtraContent}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        50081/64
                      </Button>
                      <Collapse in={showExtraContent}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent1}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        50082/64
                      </Button>
                      <Collapse in={showExtraContent1}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent2}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        50083/64
                      </Button>
                      <Collapse in={showExtraContent2}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                    </div>
                  )}
                </div>
              </Collapse>
            </div>
          </div>
          <div style={{ marginLeft: 20 }}>
            <div>
              <Button onClick={toggleThird} variant='contained' color='secondary'>
                Faubourgs d'Anfa T3
              </Button>
              <Collapse in={openThird}>
                <div style={{ marginLeft: 20 }}>
                  {openThird && (
                    <div>
                      <Button
                        onClick={toggleShowExtraContent3}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55866/64
                      </Button>
                      <Collapse in={showExtraContent3}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent4}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55867/64
                      </Button>
                      <Collapse in={showExtraContent4}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent5}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55868/64
                      </Button>
                      <Collapse in={showExtraContent5}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent6}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55869/64
                      </Button>
                      <Collapse in={showExtraContent6}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent7}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55870/64
                      </Button>
                      <Collapse in={showExtraContent7}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent8}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55941/64
                      </Button>
                      <Collapse in={showExtraContent8}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent9}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55960/64
                      </Button>
                      <Collapse in={showExtraContent9}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                      <Button
                        onClick={toggleShowExtraContent10}
                        variant='contained'
                        style={{ backgroundColor: '#C0C0C0' }}
                      >
                        55961/64
                      </Button>
                      <Collapse in={showExtraContent10}>
                        <div style={{ marginLeft: 20 }}>
                          <Typography>Additional Content for Second Collapse</Typography>
                        </div>
                      </Collapse>
                    </div>
                  )}
                </div>
              </Collapse>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}

export default ListSites
