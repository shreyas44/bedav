import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import Spinner from '../Spinner'
import { GridContainer } from '../grid'
import LocalityInfoFragment from '../fragments/locality'
import CountryFragment from '../fragments/country'
import LocalityList from './LocalityList'
import LocalityHeader from './LocalityHeader'
import Header from './Header'
import Summary from './Summary'

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 100px auto 0;
`

function HomePage(props) {
  useEffect(() => {
    document.title = "Bedav - Home"
  })

  const { data, loading, errors } = useQuery(
    gql`
      query HomePageQuery {
        country {
          ...CountryFragment
        }

        localities(first: 100) {
          edges {
            node {
              ...LocalityInfoFragment
            }
          }
        }
      }
      ${CountryFragment}
      ${LocalityInfoFragment}
    `,
  )

  if (errors) {
    console.log(errors)
    return null
  }

  if (loading || !data) return <Spinner />

  return (
    <StyledContainer>
      <Header country={data.country}/>
      <GridContainer
        columnTemplate="repeat(4, auto)"
        mobileColumnTemplate="repeat(4, auto)"
      >
        <LocalityHeader />
        <LocalityList localities={data.localities.edges} />          
      </GridContainer>
    </StyledContainer>
  )
}

export default HomePage

