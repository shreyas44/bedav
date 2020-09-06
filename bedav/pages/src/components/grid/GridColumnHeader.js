import styled from 'styled-components'
import GridCell from './GridCell'

const GridColumnHeader = styled(GridCell)`
  font-weight: bold;
  background-color: #f8f8f8 !important;
  color: #0275b3;
  transition: all 0.1s;
  cursor: pointer;
  text-decoration: none;
  position: sticky;
  left: 0;
  z-index: 2;

  &:hover {
    color: #004266;
    background-color: #eee !important;
  }

  @media only screen and (max-width: 600px) {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
`

export default GridColumnHeader
