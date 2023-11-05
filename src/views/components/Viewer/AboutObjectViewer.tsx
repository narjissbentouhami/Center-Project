import React, { useState, useEffect } from 'react'
const AboutObjectViewer = (props: any) => {
  const { visible } = props
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const object = {
    dbId: 30739,
    name: 'Piece 1',
    type: 'Part',
    category: 'Part',
    material: 'Steel',
    mass: 100,
    volume: 100,
    area: 100,
    length: 100,
    width: 100,
    height: 100
  }
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setPosition({ x: event.pageX, y: event.pageY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const style: any = {
    position: 'absolute',
    left: position.x,
    top: position.y - 10,
    transform: 'translate(-50%, -100%)',
    zIndex: 1000,
    display: visible ? 'block' : 'none',
    padding: '5px 10px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: 3,
    fontSize: 12,
    whiteSpace: 'nowrap'
  }

  return (
    <div style={style} className='modelMenu'>
      <div className='list_info'>
        <span className='list_info_key'> ID: </span>
        <span className='list_info_value'> {object.dbId} </span>
      </div>
      <div className='list_info'>
        <span className='list_info_key'> Name: </span>
        <span className='list_info_value'> {object.name} </span>
      </div>
      <div className='list_info'>
        <span className='list_info_key'> Type: </span>
        <span className='list_info_value'> {object.type} </span>
      </div>
      <div className='list_info'>
        <span className='list_info_key'> Category: </span>
        <span className='list_info_value'> {object.category} </span>
      </div>
      <div className='list_info'>
        <span className='list_info_key'> Material: </span>
        <span className='list_info_value'> {object.material} </span>
      </div>
    </div>
  )
}

export default AboutObjectViewer
