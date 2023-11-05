// ** Mock Adapter
import axios from 'axios'
import mock from 'src/@fake-db/mock'

// ** Types
import { EventType } from 'src/types/apps/calendarTypes'
import { CalendarFiltersType } from 'src/types/apps/calendarTypes'

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

const nextMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)

const prevMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

//////////////////////////////////////////
//////////////////////////////////////////

interface Event {
  id: number
  url: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  extendedProps: {
    calendar: CalendarFiltersType
  }
  Device_ID: number
}

const data: { events: EventType[] } = {
  events: [
    {
      id: 3,
      url: '',
      title: 'Employee x changed the device',
      allDay: true,
      start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
      extendedProps: {
        calendar: 'Done'
      },
      Device_ID: '1',
      materielId: 1
    },
    {
      id: 4,
      url: '',
      title: 'Install new yy',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
      allDay: true,
      extendedProps: {
        calendar: 'Maintenance'
      },
      Device_ID: '1',
      materielId: 1
    },
    {
      id: 6,
      url: '',
      title: 'repair device x',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Maintenance'
      },
      Device_ID: '1',
      materielId: 1
    },
    {
      id: 7,
      url: '',
      title: 'Employee y in charge of the repair y',
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
      allDay: true,
      extendedProps: {
        calendar: 'Done'
      },
      Device_ID: '1',
      materielId: 1
    },
    {
      id: 9,
      url: '',
      title: 'test',
      start: nextMonth,
      end: nextMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Business'
      },
      Device_ID: '1',
      materielId: 1
    },
    {
      id: 10,
      url: '',
      title: 'test',
      start: prevMonth,
      end: prevMonth,
      allDay: true,
      extendedProps: {
        calendar: 'Maintenance'
      },
      Device_ID: '1',
      materielId: 1
    }
  ]
}
export function appp() {
  fetch('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/get')
    .then(response => response.json())
    .then(dataValues => {
      const events = dataValues // assuming the events array is returned as part of the response
      let i = 10
      // use the events array to initialize the data object
      let eventsdata = events.map((event: any) => ({
        id: i++,
        url: event.title ? event.title : '',
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        allDay: true,
        // Device_ID: event.Device_ID[0]._id,
        Device_ID: event.Device_ID ? event.Device_ID : '',
        extendedProps: {
          calendar: 'Alert'
        }
      }))

      data.events.push(...eventsdata)
    })
    .catch(error => {
      console.error('Error fetching events:', error)
    })
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////

// ------------------------------------------------
// GET: Return calendar events
// ------------------------------------------------
mock.onGet('/apps/calendar/events').reply(config => {
  // Get requested calendars as Array
  const { calendars } = config.params

  return [200, data.events.filter(event => calendars.includes(event.extendedProps.calendar))]
})

// ------------------------------------------------
// POST: Add new event
// ------------------------------------------------
mock.onPost('/apps/calendar/add-event').reply(config => {
  // Get event from post data
  const { event } = JSON.parse(config.data).data

  const { length } = data.events
  let lastIndex = 0
  if (length) {
    lastIndex = data.events[length - 1].id
  }
  event.id = lastIndex + 1

  data.events.push(event)

  return [201, { event }]
})

const addEvent = async (event: any) => {
  try {
    const response = await axios.post('https://clownfish-app-tugh2.ondigitalocean.app/entretiens/', {
      data: { event }
    })
    data.events.push(event)
    return response.data.event
  } catch (error) {
    console.error(error)
  }
}

// ------------------------------------------------
// POST: Update Event
// ------------------------------------------------
mock.onPost('/apps/calendar/update-event').reply(config => {
  const eventData = JSON.parse(config.data).data.event

  // Convert Id to number
  eventData.id = Number(eventData.id)

  const event = data.events.find(ev => ev.id === Number(eventData.id))

  if (event) {
    Object.assign(event, eventData)

    return [200, { event }]
  } else {
    return [400, { error: `Event doesn't exist` }]
  }
})

// ------------------------------------------------
// DELETE: Remove Event
// ------------------------------------------------
mock.onDelete('/apps/calendar/remove-event').reply(config => {
  // Get event id from URL
  const { id } = config.params

  // Convert Id to number
  const eventId = Number(id)

  const eventIndex = data.events.findIndex(ev => ev.id === eventId)
  data.events.splice(eventIndex, 1)

  return [200]
})
