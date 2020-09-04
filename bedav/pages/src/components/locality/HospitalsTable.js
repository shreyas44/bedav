import React from 'react'
import HospitalsGrid from './hospitals/HospitalGrid'
import { SortProvider } from '../contexts/Sort'

function HospitalsTable(props) {
  return (
    <SortProvider>
      <HospitalsGrid />
    </SortProvider>
  ) 
}

export default HospitalsTable
