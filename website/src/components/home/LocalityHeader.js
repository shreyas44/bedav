import React from 'react'
import styled from 'styled-components'
import { GridColumnHeader, GridCell } from '../grid'

const Header = styled(GridCell)`
  font-weight: bold;
  background-color: var(--alabaster);
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
