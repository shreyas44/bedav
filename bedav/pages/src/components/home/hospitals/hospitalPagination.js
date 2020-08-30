import React, { useContext, useEffect, useState } from 'react'
import useDictState from '../../hooks/useDictState'
import HospitalItem from './hospitalItem'
import DataToShowContext from '../../contexts/DataToShow'

function HospitalPagination(props) {
  const {items} = props
  const {dataToShow} = useContext(DataToShowContext)
  
  function getNewRenderedItems(eachRenderCount, toBeRenderedItems) {
    let counter = 0
    const newRenderedItems = toBeRenderedItems.slice(0, eachRenderCount).map((item, index) => {
      counter += 1
      return <HospitalItem key={item.node.id} counter={counter} geolocation={props.geolocation} hospital={item.node}/>
    })

    return newRenderedItems
  }

  function getNewToBeRenderedItems(eachRenderCount, toBeRenderedItems) {
    let newToBeRenderedItems = [...toBeRenderedItems]
    newToBeRenderedItems.splice(0,eachRenderCount)
    return newToBeRenderedItems
  }

  const [state, setState] = useDictState({
    toBeRenderedItems: getNewToBeRenderedItems(20, items),
    renderedItems: getNewRenderedItems(20, items)
  })

  function resetState() {
    setState({
      renderedItems: getNewRenderedItems(20, items),
      toBeRenderedItems: getNewToBeRenderedItems(20, items),
    })
  }

  function loadMore() {
    const eachRenderCount = 10
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
      setState({
        toBeRenderedItems: getNewToBeRenderedItems(eachRenderCount, state.toBeRenderedItems),
        renderedItems: state.renderedItems.concat(getNewRenderedItems(eachRenderCount, state.toBeRenderedItems))
      })
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", loadMore)
    
    return () => {
      window.removeEventListener("scroll", loadMore)
    }
  })

  useEffect(() => {
    resetState()
  }, [dataToShow])

  return <>{state.renderedItems}</>
}

export default HospitalPagination
