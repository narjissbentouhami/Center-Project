import { GLOBAL_MODEL, MAP_2D_MODEL, VIEWER_CONFIG } from 'src/Constants/viewer'
import { getAccessToken, uploadModel } from '../../Api/models'
import { MODELS_K, MODELS_R, MODELS_O, MODELS_J, MODEL_MAGASIN_126, MODEL_MAGASIN_132, MODEL_MAGASIN_105 } from './uri'
import { URL_BASE_SERVER } from 'src/Constants/api'
import axios from 'axios'
import { encodeBase64 } from 'src/utils/data'

let viewer: Autodesk.Viewing.Viewer3D
let viewerMap: Autodesk.Viewing.Viewer3D

export function initViewer(
  main: boolean | undefined,
  is2d: boolean | undefined,
  unique: boolean | undefined
): Promise<Autodesk.Viewing.Viewer3D> {
  // @ts-ignore
  Autodesk.Viewing.Private.analytics?.optOut()

  return new Promise(function (resolve, reject) {
    Autodesk.Viewing.Initializer({ getAccessToken }, async function () {
      viewer = main
        ? new Autodesk.Viewing.Viewer3D(document.getElementById('preview') as HTMLElement, VIEWER_CONFIG)
        : new Autodesk.Viewing.GuiViewer3D(document.getElementById('preview') as HTMLElement, VIEWER_CONFIG)
      viewer.start()
      viewer.setLightPreset(7)
      viewer.setGroundShadow(false)
      viewer.setGroundReflection(false)
      viewer.setGhosting(false)

      loadExtensions(viewer)
      if (main) {
        loadModel(GLOBAL_MODEL.urn, viewer, ['IconMarkupExtension'])
        resolve(viewer)
      } else if (unique) {
        loadModel(MAP_2D_MODEL.urn, viewer, ['Autodesk.ViewCubeUi', 'ButtonExtension'])
        resolve(viewer)
      } else {
        let models = await checkWichModelFromUrl()
        models.map((m: any) => {
          if (m.urn) {
            let urn = encodeBase64(m.urn)

            loadModel(urn, viewer)
          }
        })
        resolve(viewer)
      }
    })
  })
}

export function loadModel(urn: string, viewer: Autodesk.Viewing.Viewer3D, extensions?: string[]) {
  Autodesk.Viewing.Document.load(
    `urn:${urn}`,
    (doc: Autodesk.Viewing.Document) => {
      let viewables = doc.getRoot()

      let md_viewables = viewables.search({ type: 'geometry', role: '3d' })

      let viewable = md_viewables.length >= 2 ? md_viewables[1] : md_viewables[0]

      viewer
        .loadDocumentNode(doc, viewable, {
          keepCurrentModels: true,
          globalOffset: { x: 0, y: 0, z: 0 },
          sharedPropertyDbPath: '',
          doNotCutGeometry: true,
          // applyScaling: 'm',
          // placementTransform: new THREE.Matrix4(),
          // globalOffsetIsShared: false,
          // skipHiddenFragments: true,
          // forceViewableSelection: true,
          useADP: false
        })
        .then(model => {
          if (extensions) {
            extensions.map(e => {
              viewer.loadExtension(e)
            })
          }
        })
    },
    (errorCode: Autodesk.Viewing.ErrorCodes, errorMsg: string, messages: any[]) => {
      console.log(errorCode, errorMsg, messages)
    }
  )
}

export async function setupModelUpload(file: Blob | string) {
  return uploadModel(file).then(data => data)
}

async function loadExtensions(viewer: Autodesk.Viewing.Viewer3D) {
  await viewer.loadExtension('Autodesk.AEC.LevelsExtension', {
    doNotCreateUI: true
  })
  await viewer.loadExtension('Autodesk.DocumentBrowser')
}

const checkWichModelFromUrl = async () => {
  const url = window.location.href
  const batimentId = url.split('batimentId=')[1]

  return axios
    .get(`${URL_BASE_SERVER}batiment/findByName/${batimentId}`)
    .then(res => {
      let batiment = res.data.data
      let models = batiment.models
      return models
    })
    .catch(err => {
      return []
    })

  // switch (model) {
  //   case 'K':
  //     return MODELS_K
  //   case 'R':
  //     return MODELS_R
  //   case 'O':
  //     return MODELS_O
  //   case 'J':
  //     return MODELS_J
  //   case 'M126':
  //     return MODEL_MAGASIN_126
  //   case 'M132':
  //     return MODEL_MAGASIN_132
  //   case 'M105':
  //     return MODEL_MAGASIN_105
  //   default:
  //     return MODELS_K
  // }
}
