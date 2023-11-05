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
import { use, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import jwt_decode from 'jwt-decode'
import SitesUpdate from './SitesUpdate'
import SiteMateriel from './SiteInfo'
import { set } from 'nprogress'

const MaterielList = () => {
  const [materiel, setMateriel] = useState<any>([])

  const [openEdit, setOpenEdit] = useState(false)
  const [openMateriel, setOpenMateriel] = useState(false)
  const [siteEdit, setSiteEdit] = useState<any>({})

  const [infoMateriel, setInfoMateriel] = useState<any>({})

  const handleOpenEdit = () => setOpenEdit(true)
  const handleOpenMateriel = () => setOpenMateriel(true)

  const url_base = 'http://localhost:8000/'
  // const url_base = 'http://localhost:8000/'

  // decoded token
  const decodedToken: any = jwt_decode(localStorage.getItem('accessToken') || '')

  // const afficherSites = () => {
  //   axios.get('http://localhost:8000/materiels/').then(res => {
  //     // console.log('res', res.data)
  //     setMateriel(res.data)
  //   })
  // }

  useEffect(() => {
    axios
      .get('http://localhost:8000/materiels/')
      .then(res => {
        setMateriel(res.data)
        console.log('materiel :', res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const informationSite = (site: any) => {
    // axios.get(url_base + 'site/onesite/' + id).then(res => {
    //   // console.log('res', res.data.data)
    //   setInfoSite(res.data.data)
    // })
    setInfoMateriel(site)
    handleOpenMateriel()
  }

  const editSite = (site: any) => {
    // console.log('edit site', site)
    setSiteEdit(site)
    handleOpenEdit()
  }

  const deleteSite = (id: any) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce site ?')
    if (confirmed) {
      axios.delete(url_base + 'materiel/delete/' + id).then(res => {
        window.location.reload()
        console.log('Site supprimé avec succès')
      })
    }
  }

  // useEffect(() => {
  //   afficherSites()
  // }, [])
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {/* <TableCell>Avatar</TableCell> */}
              <TableCell align='right'>Nom du matériel</TableCell>
              <TableCell align='right'>Fournisseur</TableCell>
              <TableCell align='right'>Description</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Quantité</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>

          {/* <TableBody>
            {materiel?.data.map((materiel: any, index: any) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <AvatarGroup max={3}>
                    {materiel.images.map((image: any, index: any) => (
                      <Avatar key={index} alt='S' src={image} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align='right'>{materiel.name}</TableCell>
                <TableCell align='right'>{materiel.owner}</TableCell>
                <TableCell align='right'>{materiel.description}</TableCell>
                <TableCell align='right'>{materiel.type}</TableCell>
                <TableCell align='right'>{materiel.quantity}</TableCell>
                <TableCell align='right'> */}
          {/* <IconButton color='secondary' aria-label='add' size='small' onClick={() => informationSite(materiel)}>
                    <AddIcon fontSize='small' />
                  </IconButton>

                  <IconButton color='primary' aria-label='edit' size='small' onClick={() => editSite(materiel)}>
                    <EditIcon fontSize='small' />
                  </IconButton>

                  <IconButton color='error' aria-label='delete' size='small' onClick={() => deleteSite(materiel._id)}>
                    <DeleteIcon fontSize='small' />
                  </IconButton> */}
          {/* </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>

      {/* <SitesUpdate openEdit={openEdit} setOpenEdit={setOpenEdit} siteEdit={siteEdit} />
      <SiteMateriel openInfo={openMateriel} setOpenInfo={setOpenMateriel} infoSite={infoMateriel} /> */}
    </>
  )
}

export default MaterielList
