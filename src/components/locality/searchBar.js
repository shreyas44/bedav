import React, {useState, useContext, useRef} from 'react'
import styled, { css } from 'styled-components'
import MaterialSearchIcon from '@material-ui/icons/Search'
import SearchHospitalContext from '../contexts/SearchHospital'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import { useWindowSize } from '../hooks'

let SearchIcon = ({className}) => <MaterialSearchIcon className={className} />

const SearchContainer = styled.div`
  width: 100%;
  box-shadow: 7px 15px 25px 0px rgba(0,0,0,0.1);
  margin: 10px 0 0;
  height: 60px;
  border: 1px solid #FEFEFE;
  display: flex;
  align-content: center;
  transition: all 0.1s;
  position: relative;

  &:focus-within {
    transform: scale(1.01);
    outline: none;
    box-shadow: 7px 15px 25px rgba(0,0,0,0.3);
  }

  @media only screen and (max-width: 600px) {
    margin-top: 40px;
    box-shadow: 2.5px 7.5px 12.5px 0 rgba(0,0,0,0.3);

    &:focus-within {
      transform: translate(0, -118px);
      box-shadow: 2.5px 7.5px 12.5px 0 rgba(0,0,0,0.1);
      position: fixed;
      left: 0;
      z-index: 5;
      height: 67px;
    }
  }
`

const StyledIcon = css`
  height: inherit !important;
  padding: 0 0 0 20px !important;
  font-size: 1.75rem !important;
  transition: color 0.1s !important;
  color: ${props => props.focused ? "#000" : "#777"};
  background-color: white;

  @media only screen and (max-width: 600px) {
    padding: 0 0 0 13px !important;
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  ${StyledIcon}
`

const StyledBackIcon = styled(ArrowBackIcon)`
  ${StyledIcon}
  cursor: pointer;
`

const StyledCloseIcon = styled(CloseIcon)`
  ${StyledIcon}
  cursor: pointer;
  color: black;
  padding: 0 20px 0 0 !important;

  @media only screen and (max-width: 600px) {
    padding: 0 13px 0 0 !important;
  }
`

const StyledInput = styled.input`
  height: inherit;
  box-sizing: border-box;
  padding: 20px;
  font-size: 18px;
  border: none;
  flex: 1;
  font-weight: 500;

  &:focus {
    outline: none;
    border: none;
  }

  @media only screen and (max-width: 600px) {
    padding: 20px 10px;
  }
`

function SearchBar() {
  const {searchQuery, setSearchQuery, focused, setFocus} = useContext(SearchHospitalContext)
  const textRef = useRef()
  const [width, _] = useWindowSize()

  let icon = <StyledSearchIcon focused={focused ? 1 : 0}/>
  if (focused && width <= 600) {
    icon = 
      <StyledBackIcon 
        onClick={() => {
          ref.blur()
          setFocus(false)
        }}
        focused={focused ? 1 : 0}
      />
  }

  return (
    <SearchContainer>
      {icon}
      <StyledInput 
        type="text"
        value={searchQuery}
        ref={textRef}
        onChange={event => { setSearchQuery(event.target.value) }}
        placeholder="Search for a hospital..."
        onFocus={() => { setFocus(true) }}
        onBlur={() => { setFocus(false) }} 
       />
      {
        searchQuery.length > 0 ? 
          <StyledCloseIcon 
            onClick={() => setSearchQuery('')} 
          /> : null
      }
    </SearchContainer>
  )
}

export default SearchBar
