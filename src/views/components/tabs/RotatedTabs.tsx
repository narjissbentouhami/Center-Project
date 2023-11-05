import React from 'react'

export default function RotatedTabs(props: any) {
  const { tabs, value, onChange } = props

  const handleChange = (newValue: number) => {
    onChange(newValue)
  }

  return (
    <div className='wrapper'>
      <ul id='tab'>
        {tabs.map((tab: any, index: number) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => handleChange(index)}
            style={{ borderColor: 'transparent' }}
          >
            <a href='#' style={{ backgroundColor: tab.color, borderRadius: '15px' }}>
              <span>{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
