import React from 'react'
import styled from 'styled-components'
import HospitalItem from './hospitalItem'
import {graphql, createFragmentContainer} from 'react-relay'

function HospitalList(props) {
  // const {list} = props
  const list = props.hospitalList.edges

  let counter = 0;
  const items = list.map((item, index) => {
    counter += 1
    return <HospitalItem key={index} counter={counter} hospital={item.node}/>
  })
  
  return <>{items}</>
}

export default createFragmentContainer(
  HospitalList,
  {
    hospitalList: graphql`
      fragment hospitalList_hospitalList on HospitalConnection {
        edges {
          node {
            id
            ...hospitalItem_hospital
          }
        }
      }
    `
  }
)

// export default HospitalList