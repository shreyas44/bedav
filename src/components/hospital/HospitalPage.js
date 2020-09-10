import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Spinner from '../Spinner'
import HospitalInfoFragment from '../fragments/hospital'
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

  const { data, loading, errors } = useQuery(
    gql`
      query HospitalPageQuery($hospitalId: ID!) {
        hospital(id: $hospitalId) {
          ...HospitalInfoFragment
        }
      }
      ${HospitalInfoFragment}
    `,
    {
      variables: {
        hospitalId: hospitalId
      }
    }
  )

  if (errors) {
    console.log(errors)
    return null
  }

  if (loading || !data) return <Spinner />

  document.title = 'Bedav - ' + data.hospital.name

  return (
    <>
      <MainContainer>
      <BedInfoSection hospital={data.hospital}/>
      <HospitalInfoSection hospital={data.hospital}/>
      </MainContainer>
    </>
  )
}

export default HospitalPage

