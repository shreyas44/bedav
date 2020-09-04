import React from 'react'
import styled from 'styled-components'
import LocalityRow from './LocalityRow'

function LocalityList(props) {
  const {localities} = props
  const items = localities.edges.map((item) => <LocalityRow key={item.node.id} locality={item.node}/>)

  return <>{items}</>
}

export default LocalityList
