import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import { GridCell, GridColumnHeader } from '../../grid'
import { StyledRow, StyledNumber } from './HospitalRow'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import FilterListIcon from '@material-ui/icons/FilterList'
import { useColumns } from '../../hooks'
import data from '../../extra/data'
import SortContext from '../../contexts/Sort'
import Tooltip from '../../Tooltip'
import DataToShowContext from '../../contexts/DataToShow'

const StyledHeadingName = styled(GridColumnHeader)`
  padding: 15px;
  display: flex;
  text-align: left;

  &:hover {
    font-size: 16px;
    background-color: #f8f8f8;
  }

  @media only screen and (max-width: 600px) {
    padding: 10px 5px;
  }
`

const StyledHeading = styled(StyledNumber)`
  font-weight: bold;
  padding: 15px;
  background-color: #f8f8f8;
  ${({sortable}) => sortable ? "cursor: pointer; &:hover {background-color: #eee;}" : null}

  @media only screen and (max-width: 600px) {
    padding: 15px 10px;
  } 
`

const StyledWarningIcon = styled(ErrorOutlineIcon)`
  margin-left: 5px;
  font-size: 20px !important;
  position: relative;
  bottom: 1px;
  color: #e67519;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 17px !important;
    bottom: 0;
    top: 2px;
    margin-left: 3px;
  }
`

const StyledOrderIcon = styled(FilterListIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px !important;
  color: ${({active}) => active ? '#ba7e0f' : '#ccc'};
  transform: ${({descending}) => !descending ? 'rotate(180deg)' : 'rotate(0)'};
  transition: all 0.1s !important;

  @media only screen and (max-width: 600px) {
    font-size: 14px !important;
  }
`

function HospitalGridHeader(props) {
  const {sortValue, setSortValue} = useContext(SortContext)
  const {dataToShow} = useContext(DataToShowContext)
  const columns = useColumns()

  let colorTheme;

  if(dataToShow === "occupied") {
    colorTheme = "red"
  } else if(dataToShow === "available") {
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
        descending: true,
        field: value
      })
    }
  }

  function renderHeading(index, key, text, active, descending) {
    return (
      <StyledHeading 
        colorTheme={colorTheme}
        key={index}
        value={key + dataToShow[0].toUpperCase() + dataToShow.slice(1)}
        onClick={handleClick}
        sortable
      >
        {text}
        <StyledOrderIcon active={active ? 1 : 0} descending={active ? descending ? 1 : 0 : 1}/>
      </StyledHeading>
    )
  }
  
  const items = {}

  for (const column of columns) {
    items[column] = data.columnAbbreviations[column]
  }

  const headings = Object.keys(items).map((key, index) => 
    renderHeading(
      index,
      key,
      items[key],
      sortValue.field == key + dataToShow[0].toUpperCase() + dataToShow.slice(1),
      sortValue.descending
    ))

  return (
    <StyledRow visible>

      <StyledHeadingName counter={2}>Name</StyledHeadingName>
      <StyledHeading style={{color: '#004266'}}>Hospital Type</StyledHeading>

      <StyledHeading 
        style={{color: '#004266'}}
        value="distance"
        onClick={props.geolocation ? handleClick : null}
        sortable={props.geolocation ? true : undefined}
       >
        Distance
        {!props.geolocation ? 
          <Tooltip text="Allow access to your location to view distance">
            <StyledWarningIcon />
          </Tooltip> : null
        }
        <StyledOrderIcon active={sortValue.field == "distance" ? 1 : 0} descending={sortValue.field == "distance" ? sortValue.descending ? 1 : 0 : 1}/>
      </StyledHeading>

      {headings}

    </StyledRow>
  ) 
}

export default HospitalGridHeader
