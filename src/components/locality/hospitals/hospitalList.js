import React, { useEffect, useState, useRef, useContext } from 'react'
import HospitalRow from './HospitalRow'
import HospitalsContext from '../../contexts/Hospitals'

function HospitalList(props) {
  const hospitals = useContext(HospitalsContext)
  const resetList = useRef(false)
  const rendered = useRef(20)
  const [updates, setUpdates] = useState(0)
  let counter = 1

  const virtualRendered = useRef(hospitals.map((hospital) => {
    counter += 1
    return <HospitalRow hospital={hospital} key={hospital.id} counter={counter} geolocation={props.geolocation}/>

  }))

  console.log(hospitals)

  if (resetList.current) {
    rendered.current = 20
    
    virtualRendered.current = hospitals.map((hospital) => {
      counter += 1
      return <HospitalRow hospital={hospital} key={hospital.id} counter={counter} geolocation={props.geolocation} />
    })

    loadMore(20)
    resetList.current = false
  }

  function loadMore(count) {
    rendered.current += count
    setUpdates(updates + 1)
  }

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      loadMore(20)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return <>{virtualRendered.current.slice(0,rendered.current)}</>
}

 export default HospitalList
