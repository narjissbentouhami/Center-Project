// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'

const LevelsList = (props: any) => {
  const { viewer } = props
  // ** State
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [levels, setLevels] = useState<any>([])
  const [levelExtension, setLevelExtension] = useState<any>(null)

  useEffect(() => {
    setLevelExtension(viewer.getExtension('Autodesk.AEC.LevelsExtension'))
  }, [viewer])

  useEffect(() => {
    if (!levelExtension) return
    const floorData = levelExtension.floorSelector.floorData

    const levelsMapped = floorData.map((floor: any) => {
      return {
        name: floor.name,
        level: floor.level
      }
    })
    setLevels(levelsMapped)
  }, [levelExtension])

  const handleListItemClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(-1)
      levelExtension.floorSelector.invalidateFloorSelection()
    } else {
      levelExtension.floorSelector.selectFloor(index)
      setSelectedIndex(index)
    }
  }

  return (
    <Fragment>
      <List
        sx={{
          marginLeft: '10px',
          height: '300px !important',

          overflowY: 'scroll !important',
          '::-webkit-scrollbar': {
            width: '1em'
          }
        }}
      >
        {levels.map((level: any, index: number) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{
              p: 1
            }}
          >
            <IconButton>
              <Icon icon={selectedIndex === index ? 'mdi:radiobox-marked' : 'mdi:radiobox-blank'} fontSize={10} />
            </IconButton>
            <ListItemText
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '500',
                  fontSize: 10
                }
              }}
              primary={level.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Fragment>
  )
}

export default LevelsList
