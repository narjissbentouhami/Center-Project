import dynamic from 'next/dynamic'

export const MyAwesomeMap = dynamic(() => import('src/views/dashboards/crm/MyMap'), { ssr: false })
