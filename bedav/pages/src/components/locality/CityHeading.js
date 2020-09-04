import React from 'react'
import styled from 'styled-components'

const HeadingContainer = styled.div`
  font-family: "Quicksand", sans-serif;
  color: #415c8a
`

export const CityH = styled.h1`
  font-size: 26px;
  font-family: "Quicksand", sans-serif;
  margin: 0;
`

export const LastUpdated = styled.p`
  font-size: 14px;
  margin: 0px 0;
`

function CityHeading(props) {
  const getTime = obj => {
    const minutes = obj.getMinutes()
    let hours = obj.getHours()
    let ap = hours < 12 ? "AM" : "PM"

    if(hours > 12) {
      hours -= 12
    } else if (hours == 0) {
      hours = 12
    }

    return `${hours}:${minutes} ${ap}`
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const timestamp = new Date(props.lastUpdated * 1000)
  const date = timestamp.getDate()
  const month = months[timestamp.getMonth()]
  const time = getTime(timestamp)
  
  return (
    <HeadingContainer>
      <CityH>
        {props.children} 
      </CityH>
      <LastUpdated>
        Last Updated on {date} {month}, {time}
      </LastUpdated>
    </HeadingContainer>
  )
}

export default CityHeading
