import React, {useContext} from 'react'
import styled from 'styled-components'
import { StyledRow, StyledName, StyledNumber } from './hospitalItem'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import FilterListIcon from '@material-ui/icons/FilterList'
import SortContext from '../contexts/Sort'

const StyledHeadingName = styled(StyledName)`
  padding: 15px;
  display: flex;
  text-align: left;

  &:hover {
    font-size: 16px;
    background-color: #f8f8f8;
  }
`

const StyledHeading = styled(StyledNumber)`
  font-weight: bold;
  padding: 15px;
  justify-content: center;
  background-color: #f8f8f8;
  ${({sortable}) => sortable ? "cursor: pointer; &:hover {background-color: #eee;}" : null}
`

const StyledWarningIcon = styled(ErrorOutlineIcon)`
  margin-left: 5px;
  font-size: 20px !important;
  position: relative;
  bottom: 1.5px;
  color: #e67519;
  cursor: pointer;
`

const StyledOrderIcon = styled(FilterListIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px !important;
  color: ${({active}) => active ? '#ba7e0f' : '#ccc'};
  transform: ${({descending}) => descending ? 'rotate(180deg)' : 'rotate(0)'};
  transition: all 0.1s !important;
`

function HospitalHeader(props) {
  const {sortValue, setSortValue} = useContext(SortContext)

  let colorTheme;

  if(props.dataToShow === "occupied") {
    colorTheme = "red"
  } else if(props.dataToShow === "available") {
    colorTheme = "green"
  } else {
    colorTheme = "blue"
  }

  function handleClick(event) {
    const value = event.target.getAttribute("value")

    if(value == sortValue.field) {
      setSortValue({
        ...sortValue,
        descending: !sortValue.descending
      })
    } else {
      setSortValue({
        descending: false,
        field: value
      })
    }
  }

  function renderHeading(index, key, text, active, descending) {
    return (
      <StyledHeading 
        colorTheme={colorTheme}
        key={index}
        value={`${props.dataToShow.toUpperCase()}_${key}`}
        onClick={handleClick}
        sortable
      >
        {text}
        <br/>
        {props.dataToShow[0].toUpperCase() + props.dataToShow.slice(1)}
        <StyledOrderIcon active={active ? 1 : 0} descending={active ? descending ? 1 : 0 : 0}/>
      </StyledHeading>
    )
  }

  const items = {GENERAL: "General Ward", HDU: "HDU", ICU: "ICU", VENTILATORS: "Ventilators"}

  const headings = Object.keys(items).map((key, index) => 
    renderHeading(
      index,
      key,
      items[key],
      sortValue.field == `${props.dataToShow.toUpperCase()}_${key}`,
      sortValue.descending
    ))

  return (
    <StyledRow>

      <StyledHeadingName counter={2}>Name</StyledHeadingName>
      <StyledHeading style={{color: '#004266'}}>Hospital Type</StyledHeading>

      <StyledHeading 
        style={{color: '#004266'}}
        value="DISTANCE"
        onClick={handleClick}
        sortable={props.geolocation ? true : undefined}
       >
        Distance
        {!props.geolocation ? <StyledWarningIcon /> : null}
        <StyledOrderIcon active={sortValue.field == "DISTANCE" ? 1 : 0} descending={sortValue.field == "DISTANCE" ? sortValue.descending ? 1 : 0 : 0}/>
      </StyledHeading>

      {headings}

    </StyledRow>
  ) 
}

export default HospitalHeader