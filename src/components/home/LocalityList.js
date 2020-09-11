import React, { useRef } from 'react'
import styled from 'styled-components'
import LocalityRow from './LocalityRow'

function LocalityList(props) {
  const {localities} = props
  const counter = useRef(-1)
  const items = localities.map(locality => { counter.current += 1; return <LocalityRow key={`${locality.node.name}-${locality.node.state}`} locality={locality.node} counter={counter.current}/> } )

  return <>{items}</>
}

export default LocalityList
