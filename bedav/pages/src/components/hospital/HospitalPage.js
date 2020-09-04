import React from 'react'
import styled from 'styled-components'
import { QueryRenderer, graphql } from 'react-relay'
import { useParams } from 'react-router-dom'
import environment from '../../Environment'
import HospitalInfoSection from './HospitalInfoSection'
import BedInfoSection from './BedInfoSection'

const MainContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-width: 1500px;
  margin: 100px auto 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div {
    width: 50%;
    padding: 0 5px;
    box-sizing: border-box;
    margin: 0 20px;
  }

  @media only screen and (max-width: 600px) {
    & {
      flex-direction: column;
      padding: 0;
      margin-top: 80px;
    }

    & > div {
        width: 100%;
        margin: 10px 0;
      }
  }
`

function HospitalPage(props) {
  const {hospitalId} = useParams()

 return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HospitalPageQuery($hospitalID: ID!) {
          hospital(id: $hospitalID) {
            id
            name
            phone
            address
            website
            placeId
            category
            latitude
            longitude
            icuAvailable
            hduAvailable
            generalAvailable
            ventilatorsAvailable
            icuOccupied
            hduOccupied
            generalOccupied
            ventilatorsOccupied
            icuTotal
            hduTotal
            generalTotal
            ventilatorsTotal
          }
        }
      `}

      variables={{
        hospitalID: decodeURI(hospitalId)
      }}

      render={({error, props}) => {
        if(error) {
          return
        }

        if(props) {
          return (
            <MainContainer>
              <BedInfoSection hospital={props.hospital}/>
              <HospitalInfoSection hospital={props.hospital}/>
            </MainContainer>
          )
        }
      }}
    />
  )
}

export default HospitalPage
