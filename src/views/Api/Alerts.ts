import axios from 'axios'
import { URL_BASE_SERVER } from 'src/Constants/api'

interface ModelAlertsType {
  dataexcel: DataExcelRes[]
  maintenance: MaintenanceRes
  reclam: ReclamRes
}

interface DataExcelRes {
  DataName: string | string[]
  DataValue: string
}
interface MaintenanceRes {
  maintProg?: MaintenanceResItem
  alert?: MaintenanceResItem
  maintEncours?: MaintenanceResItem
}
interface MaintenanceResItem {
  Calendar?: string
  isCritical?: string
}
interface ReclamRes {
  reclamTotal?: string
  reclamtraite?: string
}

export const getModelAlerts = async (): Promise<ModelAlertsType> => {
  try {
    let maintenanceRes: MaintenanceRes = {}
    let reclamRes: ReclamRes = {}
    const [dataexcel, maintenance, reclamTotal, reclamtraite] = await Promise.all([
      axios.get(URL_BASE_SERVER + 'GTC/excel'),
      axios.get(URL_BASE_SERVER + 'entretiens/get'),
      axios.get(URL_BASE_SERVER + 'reclamation'),
      axios.get(URL_BASE_SERVER + 'reclamation/traite')
    ])

    const dataexcelRes: DataExcelRes[] = dataexcel.data.data
      .filter((item: DataExcelRes) => item.DataName.includes('Alarme') && item.DataValue === 'On')
      .length.toString()

    maintenanceRes.maintProg = maintenance.data
      .filter((item: MaintenanceResItem) => item.Calendar === 'Maintenance')
      .length.toString()
    maintenanceRes.alert = maintenance.data
      .filter((item: MaintenanceResItem) => item.Calendar === 'Alert')
      .length.toString()
    maintenanceRes.maintEncours = maintenance.data
      .filter((item: MaintenanceResItem) => item.isCritical === 'false')
      .length.toString()

    reclamRes.reclamTotal = reclamTotal.data.data.length.toString()
    reclamRes.reclamtraite = reclamtraite.data.data.length.toString()

    return {
      dataexcel: dataexcelRes,
      maintenance: maintenanceRes,
      reclam: reclamRes
    }
  } catch (error) {
    console.log(error)
    return {
      dataexcel: [],
      maintenance: {},
      reclam: {}
    }
  }
}
