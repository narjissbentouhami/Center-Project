import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
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
import Icon from 'src/@core/components/icon'
import { toast } from 'react-hot-toast'

const MaterielListt = () => {
  const [materiel, setMateriel] = useState<any>({ data: [] })
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editMaterial, setEditMaterial] = useState({
    _id: '',
    name: '',
    owner: '',
    description: '',
    type: '',
    quantity: ''
  })

  // useEffect(() => {
  //   axios
  //     .get('https://clownfish-app-tugh2.ondigitalocean.app/materiels/')
  //     .then(res => {
  //       setMateriel(res.data)
  //       console.log('materiel :', res.data)
  //     })
  //     .catch(err => console.log(err))
  // }, [])
  const fetchMaterielList = () => {
    axios
      .get('http://localhost:8000/materiels/')
      .then(res => {
        setMateriel(res.data)
        console.log('materiel:', res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMaterielList()
  }, [])

  const handleBackDrop = () => {
    axios
      .get('http://localhost:8000/materiels/')
      .then(res => {
        setMateriel(res.data)
        console.log('materiel:', res.data)
      })
      .catch(err => console.log(err))
  }

  const handleOpenEditDialog = (
    material: React.SetStateAction<{
      _id: string
      name: string
      owner: string
      description: string
      type: string
      quantity: string
    }>
  ) => {
    setEditMaterial(material)
    setEditDialogOpen(true)
  }

  const handleCloseEditDialog = () => {
    setEditMaterial({
      _id: '',
      name: '',
      owner: '',
      description: '',
      type: '',
      quantity: ''
    })
    setEditDialogOpen(false)
  }

  const handleUpdateMaterial = () => {
    axios
      .put(`http://localhost:8000/materiels/${editMaterial._id}`, editMaterial)
      .then(res => {
        console.log('Material updated successfully:', res.data)
        handleCloseEditDialog()
        // Call a function to refresh the material list if needed
      })
      .catch(err => console.log(err))
  }

  const handleDeleteMaterial = (materialId: any) => {
    axios
      .delete(`http://localhost:8000/materiels/${materialId}`)
      .then(res => {
        console.log('Material deleted successfully:', res.data)
        // Call a function to refresh the material list if needed
        toast.success('Materiel supprimé avec succès.')
      })

      .catch(err => console.log(err))
  }

  return (
    <>
      <IconButton size='small' aria-label='collapse' sx={{ color: 'text.secondary' }} onClick={() => handleBackDrop()}>
        <Icon icon='mdi:refresh' fontSize={20} />
      </IconButton>
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Material</DialogTitle>
        <DialogContent>
          <TextField
            label='Name'
            name='name'
            value={editMaterial.name}
            onChange={e => setEditMaterial({ ...editMaterial, name: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Owner'
            name='owner'
            value={editMaterial.owner}
            onChange={e => setEditMaterial({ ...editMaterial, owner: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Description'
            name='description'
            value={editMaterial.description}
            onChange={e => setEditMaterial({ ...editMaterial, description: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Type'
            name='type'
            value={editMaterial.type}
            onChange={e => setEditMaterial({ ...editMaterial, type: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Quantity'
            name='quantity'
            value={editMaterial.quantity}
            onChange={e => setEditMaterial({ ...editMaterial, quantity: e.target.value })}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleUpdateMaterial}>
            Update
          </Button>
          <Button variant='outlined' onClick={handleCloseEditDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Nom</TableCell>
              <TableCell align='center'>Fournisseur</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Quantité</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materiel.data.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.owner}</TableCell>
                <TableCell align='center'>{row.description}</TableCell>
                <TableCell align='center'>{row.type}</TableCell>
                <TableCell align='center'>{row.quantity}</TableCell>
                <TableCell align='center'>
                  <IconButton color='primary' aria-label='edit' size='small' onClick={() => handleOpenEditDialog(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMaterial(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default MaterielListt
// import React, { useEffect, useState } from 'react'
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField
// } from '@mui/material'
// import axios from 'axios'
// import EditIcon from '@mui/icons-material/Edit'
// import Icon from 'src/@core/components/icon'

// const MaterielListt = () => {
//   const [material, setMaterial] = useState<any>({ data: [] })
//   const [editDialogOpen, setEditDialogOpen] = useState(false)
//   const [editMaterial, setEditMaterial] = useState({
//     id: '',
//     name: '',
//     owner: '',
//     description: '',
//     type: '',
//     quantity: ''
//   })

//   const fetchMaterielList = () => {
//     axios
//       .get('https://clownfish-app-tugh2.ondigitalocean.app/materiels/')
//       .then(res => {
//         setMaterial(res.data)
//         console.log('materiel:', res.data)
//       })
//       .catch(err => console.log(err))
//   }

//   useEffect(() => {
//     fetchMaterielList()
//   }, [])

//   const handleBackDrop = () => {
//     axios
//       .get('https://clownfish-app-tugh2.ondigitalocean.app/materiels/')
//       .then(res => {
//         setMaterial(res.data)
//         console.log('materiel:', res.data)
//       })
//       .catch(err => console.log(err))
//   }

//   const handleOpenEditDialog = (
//     material: React.SetStateAction<{
//       id: string
//       name: string
//       owner: string
//       description: string
//       type: string
//       quantity: string
//     }>
//   ) => {
//     setEditMaterial(material)
//     setEditDialogOpen(true)
//   }

//   const handleCloseEditDialog = () => {
//     setEditMaterial({
//       id: '',
//       name: '',
//       owner: '',
//       description: '',
//       type: '',
//       quantity: ''
//     })
//     setEditDialogOpen(false)
//   }

//   const handleUpdateMaterial = () => {
//     axios
//       .put(`https://clownfish-app-tugh2.ondigitalocean.app/materiels/${editMaterial.id}`, editMaterial)
//       .then(res => {
//         console.log('Material updated successfully:', res.data)
//         handleCloseEditDialog()
//         // Call a function to refresh the material list if needed
//       })
//       .catch(err => console.log(err))
//   }

//   return (
//     <>
//       <IconButton size='small' aria-label='collapse' sx={{ color: 'text.secondary' }} onClick={() => handleBackDrop()}>
//         <Icon icon='mdi:refresh' fontSize={20} />
//       </IconButton>
//       <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Material</DialogTitle>
//         <DialogContent>
//           <TextField
//             label='Name'
//             name='name'
//             value={editMaterial.name}
//             onChange={e => setEditMaterial({ ...editMaterial, name: e.target.value })}
//             fullWidth
//             margin='normal'
//           />
//           <TextField
//             label='Owner'
//             name='owner'
//             value={editMaterial.owner}
//             onChange={e => setEditMaterial({ ...editMaterial, owner: e.target.value })}
//             fullWidth
//             margin='normal'
//           />
//           <TextField
//             label='Description'
//             name='description'
//             value={editMaterial.description}
//             onChange={e => setEditMaterial({ ...editMaterial, description: e.target.value })}
//             fullWidth
//             margin='normal'
//           />
//           <TextField
//             label='Type'
//             name='type'
//             value={editMaterial.type}
//             onChange={e => setEditMaterial({ ...editMaterial, type: e.target.value })}
//             fullWidth
//             margin='normal'
//           />
//           <TextField
//             label='Quantity'
//             name='quantity'
//             value={editMaterial.quantity}
//             onChange={e => setEditMaterial({ ...editMaterial, quantity: e.target.value })}
//             fullWidth
//             margin='normal'
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button variant='contained' color='primary' onClick={handleUpdateMaterial}>
//             Update
//           </Button>
//           <Button variant='outlined' onClick={handleCloseEditDialog}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label='simple table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='center'>Nom</TableCell>
//               <TableCell align='center'>Fournisseur</TableCell>
//               <TableCell align='center'>Description</TableCell>
//               <TableCell align='center'>Type</TableCell>
//               <TableCell align='center'>Quantité</TableCell>
//               <TableCell align='center'>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {material.data.map((row: any) => (
//               <TableRow key={row.id}>
//                 <TableCell align='center'>{row.name}</TableCell>
//                 <TableCell align='center'>{row.owner}</TableCell>
//                 <TableCell align='center'>{row.description}</TableCell>
//                 <TableCell align='center'>{row.type}</TableCell>
//                 <TableCell align='center'>{row.quantity}</TableCell>
//                 <TableCell align='center'>
//                   <IconButton color='primary' aria-label='edit' size='small' onClick={() => handleOpenEditDialog(row)}>
//                     <EditIcon />
//                   </IconButton>
//                   {/* <IconButton onClick={() => {}}>
//                     <DeleteIcon />
//                   </IconButton> */}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   )
// }

// export default MaterielListt
