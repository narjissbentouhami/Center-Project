// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const SpacesList = (props: any) => {
  const { viewer, setNbrSpace } = props
  // ** State
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [spaces, setSpaces] = useState<any>([])
  const [models, setModels] = useState<Autodesk.Viewing.Model[]>([])
  const [modelId, setModelId] = useState<any>(null)
  useEffect(() => {
    setNbrSpace(spaces.length)
  }, [spaces.length])

  useEffect(() => {
    let allModels = viewer.getAllModels()

    setModels(allModels)

    allModels.forEach((model: Autodesk.Viewing.Model, id: number) => {
      buildModelTree(model, id)
    })
  }, [viewer])

  const handleListItemClick = (index: number) => {
    if (selectedIndex === index) {
      models.forEach((model: Autodesk.Viewing.Model, index: any) => {
        viewer.showModel(model)
      })
      setSelectedIndex(-1)
      viewer.impl.selector.clearSelection(viewer.model)
      viewer.showAll()

      viewer.fitToView(models[modelId])
    } else {
      models.forEach((model: Autodesk.Viewing.Model, index: any) => {
        if (index !== modelId) {
          viewer.hideModel(model)
        }
      })
      // console.log(models[0].getObjectTree())

      getBoundingBox(index, models[modelId])

      viewer.impl.selector.setSelection([index], models[modelId])
      viewer.isolate([index], models[modelId])
      viewer.setCutPlanes([])
      setSelectedIndex(index)
    }
  }

  const buildModelTree = (roomModel: Autodesk.Viewing.Model, id: number) => {
    let spacesList: any = []

    let tree = roomModel.getInstanceTree()
    let rootId = tree.getRootId()

    tree.enumNodeChildren(rootId, (dbId: any) => {
      let name = tree.getNodeName(dbId)

      if (name.includes('Pièces')) {
        setModelId(id)
        tree.enumNodeChildren(dbId, (childId: any) => {
          let childName = tree.getNodeName(childId)
          let space = {
            name: childName.split('[')[0],
            dbId: childId
          }
          spacesList.push(space)
        })
        setSpaces(spacesList)
      }
    })
  }

  const getBoundingBox = (dbId: any, model: Autodesk.Viewing.Model) => {
    const it = model.getInstanceTree()
    const fragList = model.getFragmentList()
    let bounds = new THREE.Box3()

    it.enumNodeFragments(
      dbId,
      fragId => {
        let box = new THREE.Box3()
        fragList.getWorldBounds(fragId, box)
        bounds.union(box)
      },
      true
    )
    // color bounds
    const geom = new THREE.BoxGeometry(
      bounds.max.x - bounds.min.x,
      bounds.max.y - bounds.min.y,
      bounds.max.z - bounds.min.z
    )
    const mat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    })
    const wireframe = new THREE.Mesh(geom, mat)
    wireframe.position.set(
      (bounds.max.x + bounds.min.x) / 2,
      (bounds.max.y + bounds.min.y) / 2,
      (bounds.max.z + bounds.min.z) / 2
    )
    viewer.impl.scene.add(wireframe)

    return bounds
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
        {spaces.map((space: any) => (
          <ListItemButton
            key={space.dbId}
            selected={selectedIndex === space.dbId}
            onClick={() => handleListItemClick(space.dbId)}
            sx={{
              p: 1
            }}
          >
            <IconButton>
              <Icon icon={selectedIndex === space.dbId ? 'mdi:radiobox-marked' : 'mdi:radiobox-blank'} fontSize={10} />
            </IconButton>
            <ListItemText
              sx={{
                '.MuiTypography-root': {
                  fontWeight: '500',
                  fontSize: 10
                }
              }}
              primary={space.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Fragment>
  )
}

export default SpacesList
