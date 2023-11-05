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
import { CardHeader, Divider, TableHead, Tooltip, Typography } from '@mui/material'
import { fontWeight } from '@mui/system'

const AttributsList = (pros: any) => {
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

  const renderGeneralInfo = () => {
    let index = 1035
    return (
      <>
        <ListItem disablePadding key={'property' + index}>
          <ListItemButton
            onClick={() => handleClick(index)}
            sx={{
              p: 1
            }}
          >
            <ListItemIcon
              sx={{
                mr: 1
              }}
            >
              <Icon icon={!open[index] ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
            </ListItemIcon>
            <ListItemText
              primary={'General Info'}
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '600',
                  fontSize: 10
                }
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={!open[index]} timeout='auto' unmountOnExit key={'propertycollapse' + index}>
          <List component='div' disablePadding>
            {generalInfo.map((prop: any, i: any) => (
              <ListItem disablePadding key={'propertycollapsedatageneral' + i}>
                <ListItemButton
                  sx={{
                    '.MuiButtonBase-root': {
                      padding: '0px !important'
                    }
                  }}
                >
                  <Table
                    size='small'
                    aria-label='a dense table'
                    // show lines bettween columns
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{
                            fontWeight: '600',
                            fontSize: 10,
                            backgroundColor: '#D1FFF3',
                            width: '50%'
                          }}
                        >
                          {prop.displayName}
                        </TableCell>

                        <TableCell
                          align='right'
                          sx={{
                            fontWeight: '500',
                            fontSize: 10,
                            backgroundColor: '#f5f5f5',
                            width: '50%'
                          }}
                        >
                          {prop.displayValue}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </>
    )
  }
  ///
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
        <Table size='small' aria-label='a dense table'>
          {/* <TableHead>
            <TableRow>
              <TableCell
                align='right'
                sx={{
                  borderRight: '1px solid lightgrey'
                }}
              >
                Nom de l attributs depuis revit
              </TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead> */}
          {generalInfo.map((prop: any, i: any) => (
            <TableBody key={'asdqweq' + i}>
              <TableRow>
                <TableCell
                  component='th'
                  scope='row'
                  sx={{
                    fontWeight: '600',
                    fontSize: 10,
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
                    fontSize: 10,
                    backgroundColor: '#f5f5f5',
                    width: '50%'
                  }}
                >
                  {prop.displayValue}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        {/* <Typography sx={{ fontSize: 12, p: 3, fontWeight: '500', backgroundColor: '#dcfeff', textAlign: 'center' }}>
          Attributs du Type
        </Typography> */}
        {/* <Table size='small' aria-label='a dense table'>
          <TableBody>
            {properties['Type'].map((prop: any, i: any) => (
              <TableRow>
                <TableCell
                  component='th'
                  scope='row'
                  sx={{
                    fontWeight: '600',
                    fontSize: 10,
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
                    fontSize: 10,
                    backgroundColor: '#f5f5f5',

                    width: '50%'
                  }}
                >
                  {prop.displayValue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </List>
    </Fragment>
  )
}

export default AttributsList
