import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { Title } from 'chart.js'
import { useEffect, useState } from 'react'

const TechniciensList = () => {
  const [techniciens, setTechniciens] = useState([])

  const url_base = 'http://localhost:8000/'

  const afficherTech = () => {
    axios.get(url_base + 'techniciens').then(res => {
      //   console.log('res', res.data)
      setTechniciens(res.data)
    })
  }

  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(' ')[0][0]}`
    }
  }

  useEffect(() => {
    afficherTech()
  }, [])
  return (
    <div>
      <TableContainer component={Paper}>
        <h3 style={{ textAlign: 'center' }}>Les Techniciens</h3>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align='right'>Nom</TableCell>
              <TableCell align='right'>Prenom</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Tâches en cours</TableCell>
              <TableCell align='right'>Plus de details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {techniciens.map((tech: any, index: any) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  <Avatar {...stringAvatar(`${tech.lastname}`)} />
                </TableCell>
                <TableCell align='right'>{tech.lastname}</TableCell>
                <TableCell align='right'>{tech.name}</TableCell>
                <TableCell align='right'>{tech.email}</TableCell>
                <TableCell align='right'>0</TableCell>
                <TableCell align='right'>
                  <Button color='primary' onClick={() => window.open('../../apps/user/view/overview/', '_self')}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TechniciensList
