import React, { useEffect, useState, useRef, useContext } from 'react'
import HospitalRow from './HospitalRow'
import HospitalsContext from '../../contexts/Hospitals'

function HospitalList(props) {
  const hospitals = useContext(HospitalsContext)
  const [updates, setUpdates] = useState(0)
  const renderedHospitals = useRef([])
  const toBeRenderedHospitals = useRef(hospitals)
  const counter = useRef(0)

  function getNewRenderedHospitals(hospitalsList, count) {
    let newRendered = hospitalsList.slice(0, count).map((hospital) => {
      const component = <HospitalRow hospital={hospital} key={hospital.id} counter={counter.current + 1} geolocation={props.geolocation}/>
      counter.current += 1
      return component
    })
    
    return newRendered
  }

  function getNewToBeRenderedHospitals(hospitalsList, count) {
    let newToBeRendered  = [...hospitalsList]
    newToBeRendered.splice(0,count)
    return newToBeRendered
  }

  function loadMore(count) {
    renderedHospitals.current = renderedHospitals.current.concat(getNewRenderedHospitals(toBeRenderedHospitals.current, count))
    toBeRenderedHospitals.current = getNewToBeRenderedHospitals(toBeRenderedHospitals.current, count)
    setUpdates(updates + 1)
  }

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      loadMore(20)
    }
  }

  useEffect(() => {
    renderedHospitals.current = []
    toBeRenderedHospitals.current = hospitals
    counter.current = 0
    loadMore(20)
  }, [hospitals])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return <>{renderedHospitals.current}</>
}

 export default HospitalList
