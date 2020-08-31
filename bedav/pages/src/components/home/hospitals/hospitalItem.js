import React, { useState, useContext, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {graphql, createFragmentContainer} from 'react-relay'
import { Link } from 'react-router-dom'
import hospitalTypes from '../../extra/categories'
import Tooltip from '../../tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DataToShowContext from '../../contexts/DataToShow'
import useWindowSize from '../../hooks/useWindowSize'
import useOnScreen from '../../hooks/useOnScreen'
import { mobileCategories } from '../../extra/categories'

export const StyledRow = styled.div`
  ${({visible}) => !visible ? `
    padding: 15px;
    height: 16px;
    grid-column: 1 / -1;
    background-color: #f8f8f8;
  ` : `display: contents;`}
`

export const StyledItem = styled.div`
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 600px) {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    font-family: "Quicksand", sans-serif;
  }
`

export const StyledName = styled(StyledItem)`
  font-weight: bold;
  background: #f8f8f8;
  color: #0275b3;
  transition: all 0.1s;
  cursor: pointer;
  text-decoration: none;
  position: sticky;
  left: 0;
  z-index: 2;

  &:hover {
    color: #004266;
    background-color: #eee;
  }

  @media only screen and (max-width: 600px) {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
`

export const StyledNumber = styled(StyledItem)`
  text-align: center;
  background: ${({counter}) => counter % 2 == 0 ? "#f8f8f8" : "white"};
  color: ${({colorTheme, children}) => children == "N.A." ? "#ddd" : colorTheme == "green" ? "#008033" : colorTheme === "red" ? "#C3423F" : colorTheme === "blue" ? "rgb(0, 66, 102)": null};
  justify-content: center;
`

const StyledInfoIcon = styled(InfoOutlinedIcon)`
  font-size: 19px !important;
  color: #aaa;
  padding-left: 5px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: inherit;
  }
`

function HospitalName({name, counter, id}) {
  const linkRef = useRef()
  const parentRef = useRef()
  const tooltipRef = useRef()

  function handleClick(event) {
    if(document.documentElement.clientWidth <= 600) {
      if(tooltipRef.current.contains(event.target)) {
        parentRef.current.style.overflow = ["hidden", ""].includes(parentRef.current.style.overflow) ? "initial" : "hidden"
        return
      }
    }

    linkRef.current.click()
  }
  
  let newName = name

  if(document.documentElement.clientWidth <= 600) {
    if(name.length > 25) {
      newName = `${name.slice(0,26).trim()}...`
    }

    return (
      <StyledName counter={counter} onClick={handleClick} ref={parentRef}>
        <StyledLink to={`/hospital/${id}`} ref={linkRef}>
          {newName}
        </StyledLink>
        { newName != name ?
        <Tooltip text={name} innerRef={tooltipRef} onClick={true}> 
          <StyledInfoIcon />          
        </Tooltip> : null}
      </StyledName>
    ) 
  } else {
    return (
      <StyledName counter={counter} onClick={handleClick} ref={parentRef}>
        <StyledLink to={`/hospital/${id}`} ref={linkRef}>
          {name}
        </StyledLink>
      </StyledName>
    )
  }
}

function HospitalItem(props) {
  let {counter, hospital} = props
  const [visible, setVisible] = useState(true)
  const {dataToShow} = useContext(DataToShowContext)
  const [width, _] = useWindowSize()
  
  function handleIntersection(entries) {
    const row = entries[0]
    const num = entries[1]

    if (visible && num && !num.isIntersecting) {
      setVisible(false)
      numRef.current = null
    }

    if(!visible && row.isIntersecting) {
      setVisible(true)
    }
  }


  const colorTheme = dataToShow == "available" ? "green" : dataToShow == "total" ? "blue" : dataToShow == "occupied" ? "red" : null  
  const fieldDataToShow = dataToShow[0].toUpperCase() + dataToShow.slice(1)
  let fields = ['general', 'hdu', 'icu', 'ventilators']
  fields = fields.map((item) => {return {total: hospital[item+'Total'], value: hospital[item+fieldDataToShow] } })

  const renderedFields = fields.map((item, index) => <StyledNumber colorTheme={colorTheme} key={index} counter={counter}>{item.total ? item.value : "N.A." }</StyledNumber>)

  return (
    <StyledRow counter={counter} visible={visible} >
      { visible ?
        <>
          <HospitalName name={hospital.name} counter={counter} id={hospital.id}/>

          <StyledNumber style={{color: '#004266'}} counter={counter}>{width <= 600 ? mobileCategories[hospitalTypes[hospital.category]] : hospitalTypes[hospital.category]}</StyledNumber>

          <StyledNumber style={{color: '#004266'}} counter={counter} >{props.geolocation ? `${hospital.distance} km` : "N.A."}</StyledNumber>
          
          {renderedFields}
        </> : null
      }
    </StyledRow>
  )
}

export default createFragmentContainer(
  HospitalItem,
  {
    hospital: graphql`
      fragment hospitalItem_hospital on Hospital {
        id
        category
        name
        distance
        generalOccupied
        generalAvailable
        hduOccupied
        hduAvailable
        icuOccupied
        icuAvailable
        ventilatorsOccupied
        ventilatorsAvailable
        generalTotal
        ventilatorsTotal
        icuTotal
        hduTotal
      }
    `
  }
)

// export default HospitalItem
