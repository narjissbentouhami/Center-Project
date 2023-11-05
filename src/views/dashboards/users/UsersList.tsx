import {
  Avatar,
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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { h } from '@fullcalendar/core/preact'
import EditUser from './EditUser'

const UsersList = () => {
  const [users, setUsers] = useState([])

  const [openEdit, setOpenEdit] = useState(false)
  const [userEdit, setUserEdit] = useState<any>({})

  const handleOpenEdit = () => setOpenEdit(true)

  const url_base = 'http://localhost:8000/'

  const afficherUsers = () => {
    axios
      .get(url_base + 'users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => {
        // console.log('res', res.data.data)
        setUsers(res.data.data)
      })
  }

  const editUser = (user: any) => {
    console.log('edit user', user)
    setUserEdit(user)
    handleOpenEdit()
  }

  const deleteUser = (id: any) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')
    if (confirmed) {
      axios.delete(url_base + 'users/' + id).then(res => {
        window.location.reload()
        console.log('utilisateur supprimé avec succès')
      })
    }
  }

  useEffect(() => {
    afficherUsers()
  }, [])
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align='right'>Nom</TableCell>
              <TableCell align='right'>Prenom</TableCell>
              <TableCell align='right'>Entreprise</TableCell>
              <TableCell align='right'>Role</TableCell>
              <TableCell align='right'>Telephone</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user: any, index: any) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <Avatar alt={user.nom} src={user.url} sx={{ width: 24, height: 24 }} />
                </TableCell>
                <TableCell align='right'>{user.nom}</TableCell>
                <TableCell align='right'>{user.prenom}</TableCell>
                <TableCell align='right'>{user.entreprise}</TableCell>
                {user.role === 'Super_Administrateur' ? (
                  <TableCell align='right'>Super Administrateur</TableCell>
                ) : user.role === 'Responsable_maintenance' ? (
                  <TableCell align='right'>Responsable de maintenance</TableCell>
                ) : user.role === 'Responsable_client' ? (
                  <TableCell align='right'>Responsable chez client</TableCell>
                ) : user.role === 'Utilisateur_final' ? (
                  <TableCell align='right'>Utilisateur final</TableCell>
                ) : (
                  <TableCell align='right'>{user.role}</TableCell>
                )}
                <TableCell align='right'>{user.telephone}</TableCell>
                <TableCell align='right'>{user.email}</TableCell>
                <TableCell align='right'>
                  <IconButton color='primary' aria-label='edit' size='small' onClick={() => editUser(user)}>
                    <EditIcon fontSize='small' />
                  </IconButton>

                  <IconButton color='error' aria-label='delete' size='small' onClick={() => deleteUser(user._id)}>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditUser openEdit={openEdit} setOpenEdit={setOpenEdit} userEdit={userEdit} />
    </>
  )
}

export default UsersList
