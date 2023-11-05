import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L, { latLngBounds } from 'leaflet'
import axios from 'axios'

import jwt_decode from 'jwt-decode'
import { URL_BASE_SERVER } from 'src/Constants/api'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'

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
  const [openDialog11, setOpenDialog11] = useState(false)
  const [openDialog12, setOpenDialog12] = useState(false)
  const [openDialog13, setOpenDialog13] = useState(false)
  const [openDialog14, setOpenDialog14] = useState(false)
  const [openDialog15, setOpenDialog15] = useState(false)
  const [openDialog16, setOpenDialog16] = useState(false)
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
  const handleMarkerClick11 = () => {
    setOpenDialog10(true)
  }
  const handleMarkerClick12 = () => {
    setOpenDialog10(true)
  }
  const handleMarkerClick13 = () => {
    setOpenDialog10(true)
  }
  const handleMarkerClick14 = () => {
    setOpenDialog10(true)
  }
  const handleMarkerClick15 = () => {
    setOpenDialog10(true)
  }
  const handleMarkerClick16 = () => {
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
  const handleCloseDialog11 = () => {
    setOpenDialog11(false)
  }
  const handleCloseDialog12 = () => {
    setOpenDialog12(false)
  }
  const handleCloseDialog13 = () => {
    setOpenDialog13(false)
  }
  const handleCloseDialog14 = () => {
    setOpenDialog14(false)
  }
  const handleCloseDialog15 = () => {
    setOpenDialog15(false)
  }
  const handleCloseDialog16 = () => {
    setOpenDialog16(false)
  }

  let popupTimeout: ReturnType<typeof setTimeout>
  const handleMarkerMouseOver = (e: any) => {
    e.target.openPopup()
    clearTimeout(popupTimeout) // Clear the timeout if it's already set
  }
  const handleMarkerMouseOver1 = (e: any) => {
    e.target.openPopup1()
    clearTimeout(popupTimeout) // Clear the timeout if it's already set
  }

  const handleMarkerMouseOut = (e: any) => {
    popupTimeout = setTimeout(() => {
      e.target.closePopup()
    }, 2000) // Close the popup after 2 seconds
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
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L1A-C01
          <br />
          SURFACES LOCATIVES (m²) : 80
          <br />
          <Button onClick={handleMarkerClick}>Visiter</Button>
        </Popup>
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
        <Popup>
          L1A-C02
          <br />
          SURFACES LOCATIVES (m²) : 55
          <br />
          <Button onClick={handleMarkerClick1}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566291, -7.658662]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick2,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L1A-C03
          <br />
          SURFACES LOCATIVES (m²) : 52
          <br />
          <Button onClick={handleMarkerClick2}>Visiter</Button>
        </Popup>
      </Marker>

      <Marker
        position={[33.566297, -7.660822]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick3,

          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3A-C01
          <br />
          SURFACES LOCATIVES (m²) : 207
          <br />
          <Button onClick={handleMarkerClick3}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.56643, -7.661044]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick4,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3A-C02
          <br />
          SURFACES LOCATIVES (m²) : 95
          <br />
          <Button onClick={handleMarkerClick4}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566571, -7.661276]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick5,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3A-C03
          <br />
          SURFACES LOCATIVES (m²) : 255
          <br />
          <Button onClick={handleMarkerClick5}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566669, -7.661074]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick6,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3A-C04
          <br />
          SURFACES LOCATIVES (m²) : 127
          <br />
          <Button onClick={handleMarkerClick6}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566714, -7.660885]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick7,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3A-C05
          <br />
          SURFACES LOCATIVES (m²) : 127
          <br />
          <Button onClick={handleMarkerClick7}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566224, -7.660438]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick8,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3B-C01
          <br />
          SURFACES LOCATIVES (m²) : 245
          <br />
          <Button onClick={handleMarkerClick8}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566104, -7.660239]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick9,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3B-C02
          <br />
          SURFACES LOCATIVES (m²) : 113
          <br />
          <Button onClick={handleMarkerClick9}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.566004, -7.660076]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick10,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          L3B-C03
          <br />
          SURFACES LOCATIVES (m²) : 173
          <br />
          <Button onClick={handleMarkerClick10}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.560486, -7.656106]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick11,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          WALILI-1
          <br />
          SURFACES LOCATIVES (m²) : 138
          <br />
          <Button onClick={handleMarkerClick11}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.560395, -7.655858]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick12,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          WALILI-2
          <br />
          SURFACES LOCATIVES (m²) : 168
          <br />
          <Button onClick={handleMarkerClick12}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.560395, -7.655858]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick13,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          WALILI-3
          <br />
          SURFACES LOCATIVES (m²) : 165
          <br />
          <Button onClick={handleMarkerClick13}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.560146, -7.655592]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick14,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          WALILI-53
          <br />
          SURFACES LOCATIVES (m²) : 131
          <br />
          <Button onClick={handleMarkerClick14}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.560114, -7.656402]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick15,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          WALILI-188
          <br />
          SURFACES LOCATIVES (m²) : 294
          <br />
          <Button onClick={handleMarkerClick15}>Visiter</Button>
        </Popup>
      </Marker>
      <Marker
        position={[33.559615, -7.656661]}
        icon={customIcon}
        eventHandlers={{
          click: handleMarkerClick16,
          mouseover: handleMarkerMouseOver,
          mouseout: handleMarkerMouseOut
        }}
      >
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <p>Nom : WALILI-190</p>
            <p>SURFACES LOCATIVES (m²) : 145</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleMarkerClick16}
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  border: '1px solid #26619c',
                  padding: '5px',
                  borderRadius: '5px',
                  backgroundColor: '#26619c'
                }}
              >
                Visiter
              </Button>
            </div>
          </div>
        </Popup>
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
      <Dialog
        open={openDialog11}
        onClose={handleCloseDialog11}
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
            src='https://my.matterport.com/show/?m=w3etJSg7CAb'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog12}
        onClose={handleCloseDialog12}
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
            src='https://my.matterport.com/show/?m=mAQXN1n8rHc'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog13}
        onClose={handleCloseDialog13}
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
            src='https://my.matterport.com/show/?m=gDDkku6HTdD'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog14}
        onClose={handleCloseDialog14}
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
            src='https://my.matterport.com/show/?m=doGsGjuiwzN'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog15}
        onClose={handleCloseDialog15}
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
            src='https://my.matterport.com/show/?m=HQXRy6auoeZ'
            width='100%'
            height='600'
            allowFullScreen
            loading='lazy'
          ></iframe>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog16}
        onClose={handleCloseDialog16}
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
            src='https://my.matterport.com/show/?m=ZZ4Q4x3ZbVK'
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
