// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatTime } from 'src/utils/date'
import { Button, Grid, Typography } from '@mui/material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import PositionedMenu from 'src/chatbot'

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  }
]

// export function appp() {
//   fetch('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/get')
//     .then(response => response.json())
//     .then(dataValues => {
//       const events = dataValues // assuming the events array is returned as part of the response
//       let i = 10
//       // use the events array to initialize the data object
//       let eventsdata = events.map((event: any) => ({
//         // id: i++,
//         meta: event.start ? event.start : '',
//         avatarAlt: 'Flora',
//         title: event.title ? event.title : '',
//         avatarImg: '/images/avatars/4.png',
//         subtitle: event.description ? event.description : ''
//       }))

//       notifications.push(...eventsdata)
//     })
//     .catch(error => {
//       console.error('Error fetching events:', error)
//     })
// }
interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

// const notifications: NotificationsType[] = [
//   {
//     meta: 'Today',
//     avatarAlt: 'Flora',
//     title: 'Congratulation Flora! 🎉',
//     avatarImg: '/images/avatars/4.png',
//     subtitle: 'Won the monthly best seller badge'
//   },
//   {
//     meta: 'Yesterday',
//     avatarColor: 'primary',
//     subtitle: '5 hours ago',
//     avatarText: 'Robert Austin',
//     title: 'New user registered.'
//   },
//   {
//     meta: '11 Aug',
//     avatarAlt: 'message',
//     title: 'New message received 👋🏻',
//     avatarImg: '/images/avatars/5.png',
//     subtitle: 'You have 10 unread messages'
//   },
//   {
//     meta: '25 May',
//     title: 'Paypal',
//     avatarAlt: 'paypal',
//     subtitle: 'Received Payment',
//     avatarImg: '/images/misc/paypal.png'
//   },
//   {
//     meta: '19 Mar',
//     avatarAlt: 'order',
//     title: 'Received Order 📦',
//     avatarImg: '/images/avatars/3.png',
//     subtitle: 'New order received from John'
//   },
//   {
//     meta: '27 Dec',
//     avatarAlt: 'chart',
//     subtitle: '25 hrs ago',
//     avatarImg: '/images/misc/chart.png',
//     title: 'Finance report has been generated'
//   }
// ]

const shortcuts: ShortcutsType[] = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    subtitle: 'Appointments',
    icon: 'mdi:calendar-month-outline'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    subtitle: 'Manage Accounts',
    icon: 'mdi:receipt-text-outline'
  },
  {
    title: 'Users',
    url: '/apps/user/list',
    subtitle: 'Manage Users',
    icon: 'mdi:account-outline'
  },
  {
    url: '/apps/roles',
    title: 'Role Management',
    subtitle: 'Permissions',
    icon: 'mdi:shield-check-outline'
  },
  {
    url: '/',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'User Dashboard'
  },
  {
    title: 'Settings',
    icon: 'mdi:cog-outline',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    title: 'Help Center',
    subtitle: 'FAQs & Articles',
    icon: 'mdi:help-circle-outline',
    url: '/pages/help-center'
  },
  {
    title: 'Dialogs',
    subtitle: 'Useful Dialogs',
    icon: 'mdi:window-maximize',
    url: '/pages/dialog-examples'
  }
]

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [notifications, setNotifications] = useState<NotificationsType[]>([
    // {
    //   meta: 'Today',
    //   avatarAlt: 'Flora',
    //   title: 'Congratulation Flora! 🎉',
    //   avatarImg: '/images/avatars/4.png',
    //   subtitle: 'Won the monthly best seller badge'
    // }
  ])

  const fetchNotifications = () => {
    axios
      .get('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/done')
      .then(response => response.data)
      .then(dataValues => {
        const events = dataValues
        let eventsdata = events.map((event: any) => ({
          meta: formatTime(event.start ? event.start : ''),
          avatarAlt: 'Flora',
          title: event.title ? event.title : '',
          avatarImg: '/images/notif.png',
          subtitle: event.description ? event.description : ''
        }))
        setNotifications(prevNotifications => [...prevNotifications, ...eventsdata])
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
  }

  const [userNom, setUserNom] = useState('')
  const [userPrenom, setUserPrenom] = useState('')
  const [userRole, setUserRole] = useState('')
  const url_base = 'http://localhost:8000/'

  const userData = async () => {
    await axios
      .get(`${url_base}auth/userInfo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(response => {
        setUserNom(response.data.data.nom)
        setUserPrenom(response.data.data.prenom)
        setUserRole(response.data.data.role)
      })
      .catch(error => {
        // console.error('Error fetching user data:', error)
      })
  }

  const [site, setSite] = useState('')
  const [ville, setVille] = useState('')
  useEffect(() => {
    // Fetch notifications on mount
    userData()
    fetchNotifications()
    let lesite = localStorage.getItem('NameSite')
    let laville = localStorage.getItem('VilleSite')
    setSite(lesite ? lesite : '')
    setVille(laville ? laville : '')
    if (window.location.pathname === '/dashboards/acceuil/') {
      localStorage.removeItem('NameSite')
      localStorage.removeItem('VilleSite')
    }
  }, [])

  const [model, setModel] = useState('')
  useEffect(() => {
    const url = window.location.href
    const name = url.split(`?batimentId=Parcelle%20`)[1]
    setModel(name)
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5px 0 10px 0 '
      }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        {/* <Autocomplete hidden={hidden} settings={settings} /> */}
      </Box>
      <Box>
        <Typography variant='subtitle2'>
          <span style={{ fontWeight: 'bold' }}> </span>
        </Typography>
        <Typography variant='subtitle2'>
          <span style={{ fontWeight: 'bold' }}></span>
          {/* {userPrenom} {userNom} */}
        </Typography>
        {userRole === 'Super_Administrateur' ? (
          <Typography variant='subtitle2'>
            <span style={{ fontWeight: 'bold' }}> </span>
          </Typography>
        ) : userRole === 'Responsable_maintenance' ? (
          <Typography variant='subtitle2'>
            <span style={{ fontWeight: 'bold' }}>Fonction : </span>
            Responsable de maintenance
          </Typography>
        ) : userRole === 'Responsable_client' ? (
          <Typography variant='subtitle2'>
            <span style={{ fontWeight: 'bold' }}>Fonction : </span>
            Responsable chez client
          </Typography>
        ) : userRole === 'Utilisateur_final' ? (
          <Typography variant='subtitle2'>
            <span style={{ fontWeight: 'bold' }}>Fonction : </span>
            Utilisateur final
          </Typography>
        ) : (
          <Typography variant='subtitle2'>
            <span style={{ fontWeight: 'bold' }}>Fonction : </span>
            {userRole}
          </Typography>
        )}
      </Box>
      <Box className='actions-left' sx={{ display: 'flex', alignItems: 'center' }}>
        {window.location.pathname === '/dashboards/crm/' ||
        window.location.pathname === '/dashboards/workflow/' ||
        window.location.pathname === '/dashboards/chosemodel/' ? (
          <Button
            variant='contained'
            color='primary'
            startIcon={<ArrowBack />}
            onClick={() => window.open('/dashboards/acceuil/', '_self')}
            style={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              color: 'inherit',
              textTransform: 'none'
            }}
          >
            Retour à la carte
          </Button>
        ) : null}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        {window.location.pathname === '/dashboards/crm/' || window.location.pathname === '/dashboards/workflow/' ? (
          <>
            {model ? (
              <>
                <Typography variant='subtitle2'>
                  <span style={{ fontWeight: 'bold' }}>Nom du parc : </span>
                  {site}
                </Typography>
                <Typography variant='subtitle2'>
                  <span style={{ fontWeight: 'bold' }}>Adresse du bâtiment : </span>
                  {ville}
                </Typography>

                <Typography variant='subtitle2'>
                  <span style={{ fontWeight: 'bold' }}>Nom du bâtiment : </span>
                  parcelle {model}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant='subtitle2'>
                  <span style={{ fontWeight: 'bold' }}>Nom du parc : </span>
                  {site}
                </Typography>
                <Typography variant='subtitle2'>
                  <span style={{ fontWeight: 'bold' }}>Adresse du bâtiment : </span>
                  {ville}
                </Typography>
              </>
            )}
          </>
        ) : null}
      </Box>
      <Box>
        {window.location.pathname === '/dashboards/chosemodel/' ? (
          <>
            <Typography variant='subtitle2'>
              <span style={{ fontWeight: 'bold' }}>Nom du parc : </span>
              {site}
            </Typography>
            <Typography variant='subtitle2'>
              <span style={{ fontWeight: 'bold' }}>Adresse du parc : </span>
              {ville}
            </Typography>
          </>
        ) : null}
      </Box>
      {/* <Box>
        {window.location.pathname === '/dashboards/crm/?model=K' ||
        window.location.pathname === '/dashboards/crm/?model=R' ||
        window.location.pathname === '/dashboards/crm/?model=O' ||
        window.location.pathname === '/dashboards/crm/?model=J' ||
        window.location.pathname === '/dashboards/workflow/' ? (
          <>
            <Typography variant='subtitle2'>
              <span style={{ fontWeight: 'bold' }}>Nom du parc : </span>
              {site}
            </Typography>
            <Typography variant='subtitle2'>
              <span style={{ fontWeight: 'bold' }}>Adresse du bâtiment : </span>
              {ville}
            </Typography>
          </>
        ) : null}
      </Box> */}
      <Box sx={{ flexGrow: 1 }} />

      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: '1rem' }}>
          <Grid container>
            <Grid item xs={4} sx={{ marginTop: '10px' }}>
              <Icon icon='mdi:sun-thermometer-outline' />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='subtitle2'>30 °C</Typography>
              <Typography variant='subtitle2'>
                <span>H: 19</span> <span>L: 8</span>
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Icon icon='mdi:headset' />
            </Grid>
            <Grid item xs={8}>
              {/* <Typography variant='subtitle1'>Helpdesk</Typography> */}
              {/* <Button size='small' sx={{ color: 'grey', padding: '0px', fontWeight: 'bold' }}>
                Helpdesk
              </Button> */}
              <PositionedMenu />
            </Grid>
          </Grid>
        </Box>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
        {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
        <UserDropdown settings={settings} />
        {/* <IconButton color='inherit' onClick={fetchNotifications}>
          <Icon icon='mdi:refresh' />
        </IconButton> */}
      </Box>
    </Box>
  )
}

export default AppBarContent
