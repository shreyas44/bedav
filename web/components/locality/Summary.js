import React from 'react'
import styled from 'styled-components'
import AmountCard from '../hospital/AmountCard'

const SummaryContainer = styled.div`
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
`

function Summary({locality}) {
  return (
    <SummaryContainer>
      <AmountCard name="Available">
        {locality.available}
      </AmountCard>
      <AmountCard name="Occupied">
        {locality.occupied}
      </AmountCard>
     <AmountCard name="Total">
        {locality.total}
      </AmountCard>
    </SummaryContainer>
  )
}

export default Summary
