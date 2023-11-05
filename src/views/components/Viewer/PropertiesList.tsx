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
import { Card, CardHeader, Divider, Tooltip, Typography } from '@mui/material'
import { fontWeight } from '@mui/system'

const PropertiesList = (pros: any) => {
  const { viewer } = pros
  // ** State
  const [open, setOpen] = useState<any>([])
  const [properties, setProperties] = useState<any>([])
  const [generalInfo, setGeneralInfo] = useState<any>([])

  useEffect(() => {
    viewer.getProperties(1, setPropertiesFromSelection)

    viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, (event: any) => {
      if (!event.selections.length) viewer.getProperties(1, setPropertiesFromSelection)
      else {
        viewer.getProperties(event.selections[0].dbIdArray[0], setPropertiesFromSelection)
      }
    })
  }, [viewer])

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

  const structure = [
    { name: 'Structure', value: '' },
    { name: 'Activer le modèle analytique', value: '' },
    { name: 'Utilisation structurelle', value: '' }
  ]
  const contrainte = [
    { name: 'Contrainte inférieure', value: '' },
    { name: 'Décalage inférieur', value: '' },
    { name: 'Partie inférieure attachée', value: '' },
    { name: 'Extension inférieure', value: '' },
    { name: 'Contrainte supérieure', value: '' },
    { name: 'Hauteur non contrainte', value: '' },
    { name: 'Décalage supérieur', value: '' },
    { name: 'Partie supérieure attachée', value: '' }
  ]

  const renderGeneralInfo = () => {
    let index = 1035
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemText
            primary={'General Info'}
            sx={{
              '.MuiTypography-root': {
                fontWeight: '600',
                fontSize: 12,
                backgroundColor: '#D1FFF3',
                padding: '10px 10px 10px 10px'
              }
            }}
          />
        </ListItem>
        <Collapse in={!open[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
          <List component='div' disablePadding>
            {generalInfo.map((prop: any, i: any) => (
              <ListItem disablePadding key={'propertycollapsedatageneral' + i}>
                <Table size='small' aria-label='a dense table'>
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
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    )
  }
  return (
    <Fragment>
      {viewer?.getSelection()[0] ? (
        <List
          component='nav'
          aria-label='main mailbox'
          sx={{
            maxHeight: '400px !important',

            overflowY: 'scroll !important',
            '::-webkit-scrollbar': {
              width: '1em'
            }
          }}
        >
          {Object.keys(properties).map((category: any, index: number) => (
            <div key={'propertycollapse' + index}>
              <ListItem disablePadding>
                <ListItemText
                  primary={category}
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: '600',
                      fontSize: 12,
                      backgroundColor: '#D1FFF3',
                      padding: '10px 10px 10px 10px'
                    }
                  }}
                />
              </ListItem>

              <List component='div' className='props_items_list' disablePadding>
                {properties[category].map((prop: any, i: any) => (
                  <ListItem disablePadding key={'propertycollapsedata' + index + i}>
                    <Table size='small' aria-label='a dense table' sx={{}}>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            component='th'
                            scope='row'
                            sx={{
                              fontWeight: '600',
                              fontSize: 11,
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
                              fontSize: 11,
                              backgroundColor: '#f5f5f5',
                              width: '50%'
                            }}
                          >
                            {typeof prop.displayValue === 'number'
                              ? Number(prop.displayValue).toFixed(2)
                              : prop.displayValue}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </List>
      ) : (
        <Card>
          <Typography
            sx={{
              fontSize: 12,
              p: 2,
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            Veuillez sélectionner un élèment !
          </Typography>
        </Card>
      )}
    </Fragment>
  )
}

export default PropertiesList
