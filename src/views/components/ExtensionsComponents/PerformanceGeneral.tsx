import React from 'react'

export default function PerformanceGeneral() {
  return (
    <>
      <h5>Engine Speed</h5>
      <canvas id='engine-speed-chart' width='100%'></canvas>
      <h5>Engine Vibrations</h5>
      <canvas id='engine-vibrations-chart' width='100%'></canvas>
      <h5>Engine Load</h5>
      <canvas id='engine-load-chart' width='100%'></canvas>
      {/* <h5>Engine Torque</h5>
      <canvas id='engine-torque-chart' width='100%'></canvas> */}
    </>
  )
}
