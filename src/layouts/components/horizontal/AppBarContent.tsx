// ** MUI Imports
import Box from '@mui/material/Box'

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
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'

// const notifications: NotificationsType[] = [
//   {
//     meta: 'Today',
//     avatarAlt: 'Flora',
//     title: 'Congratulation Flora! 🎉',
//     avatarImg: '/images/avatars/4.png',
//     subtitle: 'Won the monthly best seller badge'
//   }
// ]

// export function appp() {
//   axios
//     .get('http://localhost:8000/entretiens/done')
//     .then(response => response.data)
//     .then(dataValues => {
//       const events = dataValues // assuming the events array is returned as part of the response
//       let i = 10
//       // use the events array to initialize the data object
//       let eventsdata = events.map((event: any) => ({
//         id: i++,
//         meta: event.start ? event.start : '',
//         avatarAlt: 'Flora',
//         title: event.title ? event.title : '',
//         avatarImg: '/images/avatars/4.png',
//         subtitle: event.description ? event.description : ''
//       }))
//       console.log(eventsdata)

//       notifications.push(...eventsdata)
//     })
//     .catch(error => {
//       console.error('Error fetching events:', error)
//     })
// }

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
}

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
  const { hidden, settings, saveSettings } = props
  const [notifications, setNotifications] = useState<NotificationsType[]>([
    {
      meta: 'Today',
      avatarAlt: 'Flora',
      title: 'Congratulation Flora! 🎉',
      avatarImg: '/images/avatars/4.png',
      subtitle: 'Won the monthly best seller badge'
    }
  ])

  const fetchNotifications = () => {
    axios
      // .get('http://localhost:8000/entretiens/done')
      .get('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/done')
      .then(response => response.data)
      .then(dataValues => {
        const events = dataValues
        let i = 10
        let eventsdata = events.map((event: any) => ({
          id: i++,
          meta: event.start ? event.start : '',
          avatarAlt: 'Flora',
          title: event.title ? event.title : '',
          avatarImg: '/images/avatars/4.png',
          subtitle: event.description ? event.description : ''
        }))
        setNotifications(prevNotifications => [...prevNotifications, ...eventsdata])
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete hidden={hidden} settings={settings} />
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
      <NotificationDropdown
        settings={settings}
        notifications={notifications.map(notifications => {
          return notifications
        })}
      />

      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
