import React, { useEffect } from 'react'
import styled from 'styled-components'
import { QueryRenderer, graphql } from 'react-relay'
import Environment from '../../Environment'
import { GridContainer } from '../grid'
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
  //useEffect(() => {
    //props.ensureDidMount()
  //}, [])
  return (
    <StyledContainer>
      <Header />
      <Summary />
      <GridContainer
        columnTemplate="repeat(4, auto)"
        mobileColumnTemplate="repeat(4, auto)"
      >
        <LocalityHeader />
        <QueryRenderer 
          environment={Environment}
          query={graphql`
            query HomePageQuery {
              localities(first: 100) {
                edges {
                  node {
                    id
                    ...LocalityRow_locality    
                  }
                }
              }
            }
          `}
          variables={{}}
          render={({error, props}) => {
            if(error) {
              console.log(error)
              return <div>Error</div>
            }

            if(!props) {
              return <div>Loading...</div>
            }

            return <LocalityList localities={props.localities} />          
          }}
        />
      </GridContainer>
    </StyledContainer>
  )
}

export default HomePage
