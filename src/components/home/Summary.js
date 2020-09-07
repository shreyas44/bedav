import React from 'react'
import styled from 'styled-components'
import AmountCard from '../hospital/AmountCard'
import { addCommas } from '../extra/funcs'

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  margin: 20px auto 0;
  position: relative;
`

function Summary({country}) {
  return (
    <SummaryContainer>
      <AmountCard name="Available">
        {country.available}
      </AmountCard>
      <AmountCard name="Occupied">
        {country.occupied}
      </AmountCard>
      <AmountCard name="Total">
        {country.total}
      </AmountCard>
    </SummaryContainer>
  )
}

export default Summary
