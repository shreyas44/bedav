import React from 'react'
import styled from 'styled-components'
import AmountCard from '../hospital/AmountCard'

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 20px auto 50px;
  position: relative;
`

function Summary(props) {
  return (
    <SummaryContainer>
      <AmountCard name="Available">
        30000
      </AmountCard>
      <AmountCard name="Occupied">
        30000
      </AmountCard>
      <AmountCard name="Total">
        30000
      </AmountCard>
    </SummaryContainer>
  )
}

export default Summary
