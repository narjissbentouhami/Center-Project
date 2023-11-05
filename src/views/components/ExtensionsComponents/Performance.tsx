import React from 'react'
import PerformanceGeneral from './PerformanceGeneral'
import PerformancePart from './PerformancePart'

export default function Performance() {
  return (
    <div>
      <ul className='nav nav-tabs mb-3 nav-fill' id='performance-tabs' role='tablist'>
        <li className='nav-item'>
          <a
            className='nav-link active'
            id='performance-general-tab'
            data-toggle='tab'
            href='#performance-general'
            role='tab'
            aria-controls='performance-general'
            aria-selected='false'
          >
            General
          </a>
        </li>
        <li className='nav-item'>
          <a
            className='nav-link'
            id='performance-part-tab'
            data-toggle='tab'
            href='#performance-part'
            role='tab'
            aria-controls='performance-part'
            aria-selected='true'
          >
            Part
          </a>
        </li>
      </ul>
      <div className='tab-content' id='procurement-tabs-content'>
        <div
          className='tab-pane fade show active'
          id='performance-general'
          role='tabpanel'
          aria-labelledby='performance-general-tab'
        >
          <PerformanceGeneral />
        </div>
        <div className='tab-pane fade' id='performance-part' role='tabpanel' aria-labelledby='performance-part-tab'>
          <PerformancePart />
        </div>
      </div>
    </div>
  )
}
