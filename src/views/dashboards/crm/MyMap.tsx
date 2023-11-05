import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L, { latLngBounds } from 'leaflet'
import axios from 'axios'

import jwt_decode from 'jwt-decode'
import { URL_BASE_SERVER } from 'src/Constants/api'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

export default function MyMap(props: any) {
  const { addd, coords, display_name } = props
  const { latitude, longitude } = coords
  const customIcon = new L.Icon({
    iconUrl: '/images/icons/marker.png',
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  })

  function MapView(): any {
    const map = useMap()
    map.setView([latitude, longitude], map.getZoom())
    const fitMarkers = () => {
      let markerBounds = latLngBounds([])
      if (sites.length && sites.length > 0) {
        sites.forEach((site: any) => {
          markerBounds.extend([site.latitude, site.longitude])
        })

        map.fitBounds(markerBounds)
      }
    }
    fitMarkers()
    return null
  }

  const [sites, setSites] = useState([])

  const afficherSites = () => {
    // decoded token
    const decodedToken: any = jwt_decode(localStorage.getItem('accessToken') || '')
    axios.get(URL_BASE_SERVER + 'site/' + decodedToken._id).then(res => {
      // console.log('res', res.data)
      setSites(res.data.data)
    })
  }

  useEffect(() => {
    afficherSites()
  }, [])

  const [openDialog, setOpenDialog] = useState(false)
  const [openDialog1, setOpenDialog1] = useState(false)
  const [openDialog2, setOpenDialog2] = useState(false)
  const [openDialog3, setOpenDialog3] = useState(false)
  const [openDialog4, setOpenDialog4] = useState(false)
  const [openDialog5, setOpenDialog5] = useState(false)
  const [openDialog6, setOpenDialog6] = useState(false)
  const [openDialog7, setOpenDialog7] = useState(false)
  const [openDialog8, setOpenDialog8] = useState(false)
  const [openDialog9, setOpenDialog9] = useState(false)
  const [openDialog10, setOpenDialog10] = useState(false)

  const handleMarkerClick = () => {
    setOpenDialog(true)
  }
  const handleMarkerClick1 = () => {
    setOpenDialog1(true)
  }
  const handleMarkerClick2 = () => {
    setOpenDialog2(true)
  }
  const handleMarkerClick3 = () => {
    setOpenDialog3(true)
  }
  const handleMarkerClick4 = () => {
    setOpenDialog4(true)
  }
  const handleMarkerClick5 = () => {
    setOpenDialog5(true)
  }
  const handleMarkerClick6 = () => {
    setOpenDialog6(true)
  }
  const handleMarkerClick7 = () => {
    setOpenDialog7(true)
  }
  const handleMarkerClick8 = () => {
    setOpenDialog8(true)
  }
  const handleMarkerClick9 = () => {
    setOpenDialog9(true)
  }
  const handleMarkerClick10 = () => {
    setOpenDialog10(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleCloseDialog1 = () => {
    setOpenDialog1(false)
  }
  const handleCloseDialog2 = () => {
    setOpenDialog2(false)
  }
  const handleCloseDialog3 = () => {
    setOpenDialog3(false)
  }
  const handleCloseDialog4 = () => {
    setOpenDialog4(false)
  }
  const handleCloseDialog5 = () => {
    setOpenDialog5(false)
  }
  const handleCloseDialog6 = () => {
    setOpenDialog6(false)
  }
  const handleCloseDialog7 = () => {
    setOpenDialog7(false)
  }
  const handleCloseDialog8 = () => {
    setOpenDialog8(false)
  }
  const handleCloseDialog9 = () => {
    setOpenDialog9(false)
  }
  const handleCloseDialog10 = () => {
    setOpenDialog10(false)
  }
  return (
    <MapContainer
      className='map'
      center={[latitude, longitude]}
      zoom={1}
      style={{
        height: '100%',
        borderRadius: '0'
      }}
      attributionControl={false}
    >
      <div className='overlay2'></div>
      <div className='overlay'></div>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker
        position={[33.566415, -7.658425]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L1A-C01</Popup>
      </Marker>
      <Marker
        position={[33.566291, -7.658662]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick1,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L1A-C02</Popup>
      </Marker>
      <Marker
        position={[33.566291, -7.658662]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick2,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L1A-C03</Popup>
      </Marker>

      <Marker
        position={[33.566297, -7.660822]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick3,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3A-C01</Popup>
      </Marker>
      <Marker
        position={[33.56643, -7.661044]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick4,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3A-C02</Popup>
      </Marker>
      <Marker
        position={[33.566571, -7.661276]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick5,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3A-C03</Popup>
      </Marker>
      <Marker
        position={[33.566669, -7.661074]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick6,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3A-C04</Popup>
      </Marker>
      <Marker
        position={[33.566714, -7.660885]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick7,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3A-C05</Popup>
      </Marker>
      <Marker
        position={[33.566224, -7.660438]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick8,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3B-C01</Popup>
      </Marker>
      <Marker
        position={[33.566104, -7.660239]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick9,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3B-C02</Popup>
      </Marker>
      <Marker
        position={[33.566004, -7.660076]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick10,
          mouseover: e => {
            e.target.openPopup()
          },
          mouseout: e => {
            e.target.closePopup()
          }
        }}
      >
        <Popup>L3B-C03</Popup>
      </Marker>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=1bpDBohkDbY'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog1}
        onClose={handleCloseDialog1}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=8Y1Jv2BCR1a'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog2}
        onClose={handleCloseDialog2}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=JtNBzkibKnR'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog3}
        onClose={handleCloseDialog3}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=GvkooQvrisE'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog4}
        onClose={handleCloseDialog4}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=t1FCATTGZhq'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog5}
        onClose={handleCloseDialog5}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=X1G7T4uFMLo'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog6}
        onClose={handleCloseDialog6}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=k1nAXvUJUPn'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog7}
        onClose={handleCloseDialog7}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=8hyhmaPNfSR'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog8}
        onClose={handleCloseDialog8}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=KFYZxr6BRDU'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog9}
        onClose={handleCloseDialog9}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=GH5xbbSp1rU'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog10}
        onClose={handleCloseDialog10}
        fullWidth
        maxWidth='xl'
        sx={{
          // Custom styles for the Dialog component
          '& .MuiDialog-paper': {
            width: '70%',
            maxWidth: '90%'
          }
        }}
      >
        {/* <DialogTitle>Small Page</DialogTitle> */}
        <DialogContent>
          {/* Content of the small page, you can add an iframe for the URL */}
          <iframe
            title='Google Maps'
            src='https://my.matterport.com/show/?m=GH5xbbSp1rU'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <MapView />
    </MapContainer>
  )
}
