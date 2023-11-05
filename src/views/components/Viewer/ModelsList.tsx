// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import EastIcon from '@mui/icons-material/East'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  SwitchProps,
  Typography
} from '@mui/material'
import styled from '@emotion/styled'
import { findByNameAndReturnDisplayName } from './uri'

const ModelsList = (props: any) => {
  const { viewer } = props
  // ** State
  const [models, setModels] = useState<any>([])
  const [visibleModels, setVisibleModels] = useState<any>({})
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  useEffect(() => {
    if (!viewer) return
    let allModels = viewer.getAllModels()
    setModels(allModels)
    allModels.forEach((model: any, index: any) => {
      setVisibleModels((visibleModels: any) => {
        return { ...visibleModels, [index]: true }
      })
    })
  }, [viewer])

  const handleListItemClick = (index: number) => {
    if (visibleModels[index]) {
      viewer.hideModel(models[index])
      setVisibleModels({ ...visibleModels, [index]: false })
    } else {
      viewer.showModel(models[index])
      setVisibleModels({ ...visibleModels, [index]: true })
    }
  }

  return (
    <div
      style={{
        justifyContent: 'right',
        display: 'flex',
        position: 'absolute',
        zIndex: 100
      }}
    >
      <Button
        id='basic-button'
        variant='contained'
        endIcon={<EastIcon />}
        onClick={handleClick}
        style={{
          backgroundColor: '#02908b',
          boxShadow: 'none',
          color: '#fff',
          textTransform: 'none'
        }}
      >
        MODELS
      </Button>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        classes={{
          list: 'list_models'
        }}
      >
        {models.map(
          (model: any, index: any) =>
            model && (
              <FormControlLabel
                key={index}
                control={<Checkbox onClick={() => handleListItemClick(index)} checked={visibleModels[index]} />}
                label={findByNameAndReturnDisplayName(
                  model.getData().loadOptions.bubbleNode.getRootNode().children[0].name()
                )}
                classes={{
                  root: 'list_models_item',
                  label: 'list_models_item_label'
                }}
              />
            )
        )}
      </Menu>
    </div>
  )
}

export default ModelsList
