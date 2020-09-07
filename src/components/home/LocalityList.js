import React, { useRef } from 'react'
import styled from 'styled-components'
import LocalityRow from './LocalityRow'

function LocalityList(props) {
  const {localities} = props
  const counter = useRef(-1)
  const items = localities.edges.map((item) => { counter.current += 1; return <LocalityRow key={item.node.id} locality={item.node} counter={counter.current}/> } )

  return <>{items}</>
}

export default LocalityList
