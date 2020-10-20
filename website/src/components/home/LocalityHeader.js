import React from 'react'
import styled from 'styled-components'
import { GridColumnHeader, GridCell } from '../grid'

const Header = styled(GridCell)`
  font-weight: bold;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
`

const Row = styled.div`
  display: contents;
`

function LocalityHeader() {
  return (
    <Row>
      <GridColumnHeader>
        Area
      </GridColumnHeader>
      <Header colorTheme="green">
        Available
      </Header>
     <Header colorTheme="red">
        Occupied
      </Header>

     <Header colorTheme="blue">
        Total
      </Header>
    </Row>
  )
}

export default LocalityHeader
