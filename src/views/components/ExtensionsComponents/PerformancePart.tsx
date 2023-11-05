import React from 'react'

export default function PerformancePart() {
  return (
    <>
      <div className='alert alert-secondary'>Select a single part in the 3D view</div>
      <h5>Current Temperature</h5>
      <svg id='part-current-temperature' width='250' height='100'>
        <defs>
          <mask id='gauge-mask'>
            <circle fill='white' cx='125' cy='100' r='75'></circle>
            <circle fill='black' cx='125' cy='100' r='50'></circle>
          </mask>
        </defs>
        <polygon points='125,100 0,100 0,0' fill='green' mask='url(#gauge-mask)'></polygon>
        <polygon points='125,100 0,0 250,0' fill='orange' mask='url(#gauge-mask)'></polygon>
        <polygon points='125,100 250,0 250,100' fill='red' mask='url(#gauge-mask)'></polygon>
        <text fill='gray' x='25' y='100'>
          0°
        </text>
        <text fill='gray' x='40' y='50'>
          25°
        </text>
        <text fill='gray' x='190' y='50'>
          75°
        </text>
        <text fill='gray' x='210' y='100'>
          100°
        </text>
        <polygon
          id='gauge-needle'
          points='125,105 120,100 100,25 130,100'
          fill='black'
          transform='rotate(-30,125,125)'
        ></polygon>
      </svg>
      <h5>Temperature History</h5>
      <canvas id='part-temperatures-chart' width='100%'></canvas>
      <form id='temperature-alert-form'>
        {/* <h5>Temperature Alert</h5>
        <div className='row mb-2'>
          <label className='col-sm-2 col-form-label'>Part #</label>
          <div className='col-sm-2'>
            <input className='form-control-plaintext' id='temperature-alert-part' type='text' />
          </div>
          <label className='col-sm-4 col-form-label'>Max Temp [C]</label>
          <div className='col-sm-4'>
            <input className='form-control' id='temperature-alert-max' type='text' />
          </div>
        </div>
        <button className='btn btn-primary mr-2'>Set</button>
        <button className='btn btn-secondary'>Clear</button> */}
      </form>
    </>
  )
}
