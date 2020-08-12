import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import MaterialSearchIcon from '@material-ui/icons/Search'

let SearchIcon = ({className}) => <MaterialSearchIcon className={className} />

const StyledSearchIcon = styled(SearchIcon)`
  height: inherit !important;
  padding: 0 0 0 20px !important;
  font-size: 1.75rem !important;
  transition: color 0.1s !important;
  color: ${props => props.focused ? "#000" : "#777"};
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
`

function SearchBar() {
  let [query, setQuery] = useState('')
  let [focused, setFocus] = useState(false)

  return (
    <> 
      <StyledSearchIcon focused={focused}/>
      <StyledInput type="text" value={query} onChange={event => { setQuery(event.target.value) }} placeholder="Search for a hospital..." onFocus={() => { setFocus(true) }} onBlur={() => { setFocus(false) }} />
    </>
  )
}

export default SearchBar