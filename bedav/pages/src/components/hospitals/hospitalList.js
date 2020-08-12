import React from 'react'
import styled from 'styled-components'
import HospitalItem from './hospitalItem'

const sample = [
  {
    name: "Apollo",
    beds: 300,
    availableBeds: 100,
    ICU: 100,
    availableICU: 50,
    ventilators: 100,
    availableVentilators: 50,
    distance: 3.1
  },
  {
    name: "Fortis",
    beds: 300,
    availableBeds: 100,
    ICU: 100,
    availableICU: 50,
    ventilators: 100,
    availableVentilators: 50,
    distance: 3.1
  },
  {
    name: "Apollo",
    beds: 300,
    availableBeds: 100,
    ICU: 100,
    availableICU: 50,
    ventilators: 100,
    availableVentilators: 50,
    distance: 3.1
  },
  {
    name: "Apollo",
    beds: 300,
    availableBeds: 100,
    ICU: 100,
    availableICU: 50,
    ventilators: 100,
    availableVentilators: 50,
    distance: 3.1
  }
]


function HospitalList(props) {
  // const {list} = props
  const list = sample

  let counter = 0;
  const items = list.map((item, index) => {
    counter += 1
    return <HospitalItem key={index} {...item} counter={counter}/>
  })
  
  return <>{items}</>
}

export default HospitalList