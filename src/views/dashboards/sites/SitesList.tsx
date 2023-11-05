import {
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import jwt_decode from 'jwt-decode'
import SitesUpdate from './SitesUpdate'
import SiteInfo from './SiteInfo'
import { set } from 'nprogress'

const SitesList = () => {
  const [sites, setSites] = useState([])

  const [openEdit, setOpenEdit] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [siteEdit, setSiteEdit] = useState<any>({})

  const [infoSite, setInfoSite] = useState<any>({})

  const handleOpenEdit = () => setOpenEdit(true)
  const handleOpenInfo = () => setOpenInfo(true)

  const url_base = 'http://localhost:8000/'
  // const url_base = 'http://localhost:8000/'

  // decoded token
  const decodedToken: any = jwt_decode(localStorage.getItem('accessToken') || '')

  const afficherSites = () => {
    axios.get(url_base + 'site/' + decodedToken._id).then(res => {
      // console.log('res', res.data)
      setSites(res.data.data)
    })
  }

  const informationSite = (site: any) => {
    // axios.get(url_base + 'site/onesite/' + id).then(res => {
    //   // console.log('res', res.data.data)
    //   setInfoSite(res.data.data)
    // })
    setInfoSite(site)
    handleOpenInfo()
  }

  const editSite = (site: any) => {
    // console.log('edit site', site)
    setSiteEdit(site)
    handleOpenEdit()
  }

  const deleteSite = (id: any) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce site ?')
    if (confirmed) {
      axios.delete(url_base + 'site/delete/' + id).then(res => {
        window.location.reload()
        console.log('Site supprimé avec succès')
      })
    }
  }

  useEffect(() => {
    afficherSites()
  }, [])
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align='right'>Nom du projet</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Maitre d'ouvrage</TableCell>
              <TableCell align='right'>Adresse</TableCell>
              <TableCell align='right'>Pays</TableCell>
              <TableCell align='right'>Ville</TableCell>
              <TableCell align='right'>Latitude</TableCell>
              <TableCell align='right'>Longitude</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites?.map((site: any, index: any) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <AvatarGroup max={3}>
                    {site.images.map((image: any, index: any) => (
                      <Avatar key={index} alt='S' src={image} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align='right'>{site.nameProjet}</TableCell>
                <TableCell align='right'>{site.type}</TableCell>
                <TableCell align='right'>{site.maitreOuvrage}</TableCell>
                <TableCell align='right'>{site.adresse}</TableCell>
                <TableCell align='right'>{site.pays}</TableCell>
                <TableCell align='right'>{site.ville}</TableCell>
                <TableCell align='right'>{site.latitude}</TableCell>
                <TableCell align='right'>{site.longitude}</TableCell>
                <TableCell align='right'>
                  <IconButton color='secondary' aria-label='add' size='small' onClick={() => informationSite(site)}>
                    <AddIcon fontSize='small' />
                  </IconButton>

                  <IconButton color='primary' aria-label='edit' size='small' onClick={() => editSite(site)}>
                    <EditIcon fontSize='small' />
                  </IconButton>

                  <IconButton color='error' aria-label='delete' size='small' onClick={() => deleteSite(site._id)}>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SitesUpdate openEdit={openEdit} setOpenEdit={setOpenEdit} siteEdit={siteEdit} />
      <SiteInfo openInfo={openInfo} setOpenInfo={setOpenInfo} infoSite={infoSite} />
    </>
  )
}

export default SitesList
