import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import MaterialSearchIcon from '@material-ui/icons/Search'
import SearchHospitalContext from '../contexts/SearchHospital'

let SearchIcon = ({className}) => <MaterialSearchIcon className={className} />

const SearchContainer = styled.div`
  width: 60%;
  box-shadow: 7px 15px 25px 0px rgba(0,0,0,0.1);
  margin: 60px auto 0;
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
    width: calc(100% - 20px);
    box-shadow: 2.5px 7.5px 12.5px 0 rgba(0,0,0,0.3);

    &:focus-within {
      transform: none;
      box-shadow: 2.5px 7.5px 12.5px 0 rgba(0,0,0,0.4);
    }
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  height: inherit !important;
  padding: 0 0 0 20px !important;
  font-size: 1.75rem !important;
  transition: color 0.1s !important;
  color: ${props => props.focused ? "#000" : "#777"};

  @media only screen and (max-width: 600px) {
    padding: 0 0 0 13px !important;
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
  let {searchQuery, setSearchQuery} = useContext(SearchHospitalContext)
  let [focused, setFocus] = useState(false)

  return (
    <SearchContainer>
      <StyledSearchIcon focused={focused}/>
      <StyledInput 
        type="text"
        value={searchQuery}
        onChange={event => { setSearchQuery(event.target.value) }}
        placeholder="Search for a hospital..."
        onFocus={() => { setFocus(true) }} onBlur={() => { setFocus(false) }} 
       />
    </SearchContainer>
  )
}

export default SearchBar
