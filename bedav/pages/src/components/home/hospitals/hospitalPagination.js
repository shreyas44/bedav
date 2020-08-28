import React, { useContext, useEffect } from 'react'
import useDictState from '../../hooks/useDictState'
import HospitalItem from './hospitalItem'

function HospitalPagination(props) {
  const {items} = props
  const eachRenderCount = 10
  
  function getNewRenderedItems(toBeRenderedItems) {
    let counter = 0
    const newRenderedItems = toBeRenderedItems.slice(0, eachRenderCount).map((item, index) => {
      counter += 1
      return <HospitalItem key={index} counter={counter} geolocation={props.geolocation} hospital={item.node}/>
    })

    return newRenderedItems
  }

  function getNewToBeRenderedItems(toBeRenderedItems) {
    let newToBeRenderedItems = [...toBeRenderedItems]
    newToBeRenderedItems.splice(0,eachRenderCount)
    return newToBeRenderedItems
  }

  const [state, setState] = useDictState({
    toBeRenderedItems: getNewToBeRenderedItems(items),
    renderedItems: getNewRenderedItems(items)
  })

  function resetState() {
    setState({
      renderedItems: getNewRenderedItems(items),
      toBeRenderedItems: getNewToBeRenderedItems(items),
    })
  }

  function loadMore() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setState({
        toBeRenderedItems: getNewToBeRenderedItems(state.toBeRenderedItems),
        renderedItems: state.renderedItems.concat(getNewRenderedItems(state.toBeRenderedItems))
      })
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", loadMore)
    
    return () => {
      window.removeEventListener("scroll", loadMore)
    }
  })

  return <>{state.renderedItems}</>
}

export default HospitalPagination
