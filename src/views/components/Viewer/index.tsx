import { Card, CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import { getModelAlerts } from 'src/views/Api/Alerts'
import { MAIN_MODEL_ID } from 'src/Constants/viewer'
import { initViewer } from './viewer'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface ViewerProps {
  setGlobalModel: (props: Autodesk.Viewing.Viewer3D) => void
  setSpecificModel: (props: Autodesk.Viewing.PropertyResult) => void
  main?: boolean
  is2d?: boolean
  fullHeight?: boolean
  width?: string
  unique?: boolean
}

const Viewer = (props: ViewerProps) => {
  const { setGlobalModel, setSpecificModel, main, is2d, fullHeight, width, unique } = props

  useEffect(() => {
    initViewer(main, is2d, unique).then(viewer => {
      setGlobalModel(viewer)

      viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
        if (main) {
          mainModelInfo(viewer)
          viewer.fitToView(MAIN_MODEL_ID, viewer.model)

          viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, () => {
            viewer.clearSelection()
          })
          viewer.disableHighlight(true)
        }
      })

      viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, function (e) {
        let _selectedModel = viewer.getAggregateSelection()[0]?.model
        if (!_selectedModel) return

        _selectedModel.getGlobalOffset()
      })
      itemSelected(viewer)
    })
  }, [])

  function mainModelInfo(viewer: Autodesk.Viewing.Viewer3D) {
    getModelAlerts().then(res => {
      viewer.getExtension('IconMarkupExtension', (ext: any) => {
        let miniData = [
          {
            value: res.maintenance.maintProg + ' Kwh',
            icon: 'fa-solid fa-bolt',
            color: '#16b1ff'
          },
          {
            value: res.maintenance.alert + ' M³',
            icon: 'fa-solid fa-droplet',
            color: '#56ca00'
          },
          {
            value: res.reclam.reclamTotal,
            icon: 'fa-solid fa-bell',
            color: '#ffb400'
          }
        ]
        let data = [
          {
            dbId: 458,
            label: 'O',
            data: miniData
          },
          {
            dbId: 14,
            label: 'J',
            data: miniData
          },
          {
            dbId: 617,
            label: 'K',
            data: miniData
          },
          {
            dbId: 59,
            label: 'R',
            data: miniData
          }
        ]
        ext.showIcons(true, data)
      })
    })
  }

  function itemSelected(viewer: Autodesk.Viewing.Viewer3D) {
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function () {
      let selection = viewer.getSelection()

      viewer.getProperties(selection[0], function (props: Autodesk.Viewing.PropertyResult) {
        setSpecificModel(props)
      })
    })
  }

  return (
    <Card
      className='infocard3 viewerparent'
      id='viewerparent'
      sx={{ ...(fullHeight && { height: '100%' }), ...(width && { width: width }) }}
    >
      <PerfectScrollbar>
        <CardContent
          className='viewer'
          style={{
            height: '100%',
            display: 'block'
          }}
          sx={{
            ...(fullHeight && { padding: '0px !important' })
          }}
        >
          <div id='preview' />
        </CardContent>
      </PerfectScrollbar>
    </Card>
  )
}

export default Viewer
