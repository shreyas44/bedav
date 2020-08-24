import React from 'react'
import styled from 'styled-components'
import AmountCard from './amountCard'

const SectionContainer = styled.div`
  margin-bottom: 30px;
`

const SectionHeader = styled.h2`
  margin: 0;
  font-size: 18px;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;

  & > div {
    width: 33%;
    margin: 0 10px;

    &:first-child {
      margin-left: 0;
    }

    &::last-child {
      margin-right: 0;
    }
  }
`

function EquipmentSection(props) {
  const {sectionName, values} = props

  const cards = Object.keys(values).map((name, index) => <AmountCard key={index} name={name}>{values[name]}</AmountCard>)
  return (
    <SectionContainer>
      <SectionHeader>
        {sectionName}
      </SectionHeader>
      <CardsContainer>
        {cards}
      </CardsContainer>
    </SectionContainer>
  )
}

export default EquipmentSection
