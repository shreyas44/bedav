import React from 'react'
import styled from 'styled-components'

const DropdownItem = styled.div`
  padding: 7px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #eee;
  }

  &:first-child {
    padding-top: 8px;
    position: relative;
  }

  &:last-child {
    padding-bottom: 8px;
  }

  @media only screen and (max-width: 600px) {
    padding: 13px 18px;

    &:first-child {
      padding-top: 15px;
    }

    &:last-child {
      padding-bottom: 15px;
    }
  }
`

export default DropdownItem