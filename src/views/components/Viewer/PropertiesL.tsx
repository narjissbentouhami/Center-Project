// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Box, Card, CardHeader, Divider, Tooltip, Typography } from '@mui/material'
import { fontWeight } from '@mui/system'

const PropertiesL = (pros: any) => {
  const { globalModel } = pros
  // ** State
  const [open, setOpen] = useState<any>([])
  const [properties, setProperties] = useState<any>([])
  const [generalInfo, setGeneralInfo] = useState<any>([])

  useEffect(() => {
    globalModel.getProperties(1, setPropertiesFromSelection)

    globalModel.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, (event: any) => {
      if (!event.selections.length) globalModel.getProperties(1, setPropertiesFromSelection)
      else {
        globalModel.getProperties(event.selections[0].dbIdArray[0], setPropertiesFromSelection)
      }
    })
  }, [globalModel])

  const dt1 = [
    { name: 'Nom', value: 'Nom du composant' },
    { name: 'Description', value: '' },
    { name: 'Numéro de série', value: 'k85d4f' },
    { name: 'Code-barres', value: '445562' },
    { name: 'Identifiant de l’asset', value: 'I456' },
    { name: 'Date d’installation', value: '28/11/2022' },
    { name: 'Date de début de garantie', value: '12/05/2023' }
  ]

  const dt2 = [
    { name: 'Espace', value: '' },
    { name: 'Zone', value: '' },
    { name: 'Etage', value: '' },
    { name: 'Systeme', value: '' }
  ]

  const dt3 = [
    { name: 'Nom', value: '' },
    { name: 'Description', value: '' },
    { name: 'Fabriquant/Marque', value: '' },
    { name: 'Réfrence Modèle', value: '' },
    { name: 'Type d assets', value: '' }
  ]

  const dt4 = [
    { name: 'Cout de remplacement', value: '' },
    { name: 'Pièces de rechange restantes dans le stock', value: '' }
  ]

  const dt5 = [
    { name: 'Garant de l équipement', value: '' },
    { name: 'Durée de garantie', value: '' },
    // ref du contrat de garantie
    { name: 'Référence du contrat de garantie', value: '' },
    // garant des pièces
    { name: 'Garant des pièces', value: '' },
    // durée de garantie des pièces
    { name: 'Durée de garantie des pièces', value: '' }
  ]
  const handleClick = (index: any) => {
    let newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  const setPropertiesFromSelection = (e: any) => {
    let props: any = {}
    let generalProps: any = []
    for (let i = 0; i < e.properties.length; i++) {
      if (e.properties[i].displayCategory.includes('_')) continue
      let propCategory = e.properties[i].displayCategory
      props[propCategory] = [...(props[propCategory] || []), e.properties[i]]
    }
    for (let i = 0; i < e.properties.length; i++) {
      if (
        e.properties[i].displayName === 'ElementId' ||
        e.properties[i].displayName === 'Category' ||
        e.properties[i].displayName === 'CODE BIM' ||
        e.properties[i].displayName === 'Nom du type'
      )
        generalProps = [...(generalProps || []), e.properties[i]]
    }
    setGeneralInfo(generalProps)
    setProperties(props)
  }

  // const renderGeneralInfo = () => {
  //   let index = 1235
  //   return (
  //     <>
  //       <ListItem disablePadding key={'property' + index}>
  //         <ListItemButton
  //           onClick={() => handleClick(index)}
  //           sx={{
  //             p: 1
  //           }}
  //         >
  //           <ListItemIcon
  //             sx={{
  //               mr: 1
  //             }}
  //           >
  //             <Icon icon={!open[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
  //           </ListItemIcon>
  //           <ListItemText
  //             primary={'General Info'}
  //             sx={{
  //               '.MuiTypography-root': {
  //                 fontWeight: '600',
  //                 fontSize: 12
  //               }
  //             }}
  //           />
  //         </ListItemButton>
  //       </ListItem>
  //       <Collapse in={!open[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
  //         <List component='div' disablePadding>
  //           {generalInfo.map((prop: any, i: any) => (
  //             <ListItem disablePadding key={'propertycollapsedatageneral' + i}>
  //               <ListItemButton
  //                 sx={{
  //                   '.MuiButtonBase-root': {
  //                     padding: '0px !important'
  //                   }
  //                 }}
  //               >
  //                 <Table size='small' aria-label='a dense table'>
  //                   <TableBody>
  //                     <TableRow>
  //                       <TableCell
  //                         component='th'
  //                         scope='row'
  //                         sx={{
  //                           fontWeight: '600',
  //                           fontSize: 12,
  //                           backgroundColor: '#ECFFDC',
  //                           width: '50%'
  //                         }}
  //                       >
  //                         {prop.displayName}
  //                       </TableCell>
  //                       <TableCell
  //                         align='right'
  //                         sx={{
  //                           fontWeight: '500',
  //                           fontSize: 12,
  //                           backgroundColor: '#f5f5f5',
  //                           width: '50%'
  //                         }}
  //                       >
  //                         {prop.displayValue}
  //                       </TableCell>
  //                     </TableRow>
  //                   </TableBody>
  //                 </Table>
  //               </ListItemButton>
  //             </ListItem>
  //           ))}
  //         </List>
  //       </Collapse>
  //     </>
  //   )
  // }
  return (
    <Fragment>
      <List
        component='nav'
        aria-label='main mailbox'
        sx={{
          '.MuiList-root': {
            height: '200px'
          }
        }}
      >
        <Typography sx={{ fontSize: 14, p: 3, fontWeight: '500', textAlign: 'center' }}>Composant</Typography>

        {globalModel?.getSelection()[0] ? (
          <Box>
            <Table size='small' aria-label='a dense table' sx={{}}>
              <TableBody>
                {dt1.map((prop: any, i: any) => (
                  <TableRow key={'propertycollapsedatageneral' + i}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey' // Add this style
                      }}
                    >
                      {prop.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {generalInfo.map((prop: any, i: any) => (
              <Table size='small' aria-label='a dense table' key={'propertycollapsedatageneral' + i}>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey'
                      }}
                    >
                      {prop.displayName}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.displayValue}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
            <Typography sx={{ fontSize: 12, p: 3, fontWeight: '500', textAlign: 'center' }}>Emplacement</Typography>
            <Table size='small' aria-label='a dense table'>
              <TableBody>
                {dt2.map((prop: any, i: any) => (
                  <TableRow key={'propertycollapsedatageneral' + i}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey'
                      }}
                    >
                      {prop.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography sx={{ fontSize: 12, p: 3, fontWeight: '500', textAlign: 'center' }}>Données du Type</Typography>
            <Table size='small' aria-label='a dense table'>
              <TableBody>
                {dt3.map((prop: any, i: any) => (
                  <TableRow key={'propertycollapsedatageneral' + i}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey'
                      }}
                    >
                      {prop.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography sx={{ fontSize: 12, p: 3, fontWeight: '500', textAlign: 'center' }}>Maintenance</Typography>
            <Table size='small' aria-label='a dense table'>
              <TableBody>
                {dt4.map((prop: any, i: any) => (
                  <TableRow key={'propertycollapsedatageneral' + i}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey'
                      }}
                    >
                      {prop.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography sx={{ fontSize: 12, p: 3, fontWeight: '500', textAlign: 'center' }}>Garantie</Typography>
            <Table size='small' aria-label='a dense table'>
              <TableBody>
                {dt5.map((prop: any, i: any) => (
                  <TableRow key={'propertycollapsedatageneral' + i}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontWeight: '600',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%',
                        borderRight: '1px solid lightgrey'
                      }}
                    >
                      {prop.name}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: '500',
                        fontSize: 12,
                        backgroundColor: '#f5f5f5',
                        width: '50%'
                      }}
                    >
                      {prop.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <Card>
            <Typography
              sx={{
                textAlign: 'center',
                '.MuiTypography-root': {
                  fontWeight: '800',
                  fontSize: 13
                },
                position: 'absolute',
                marginTop: '12rem'
              }}
            >
              Selectionner un composant
            </Typography>
          </Card>
        )}
      </List>
    </Fragment>
  )
}

export default PropertiesL
