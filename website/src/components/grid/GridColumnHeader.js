import styled from 'styled-components'
import GridCell from './GridCell'

const GridColumnHeader = styled(GridCell)`
  font-weight: bold;
  background-color: var(--alabaster) !important;
  color: var(--deep-cerulean);
  transition: all 0.1s;
  cursor: pointer;
  text-decoration: none;
  position: sticky;
  left: 0;
  z-index: 2;

  &:hover {
    color: var(--regal-blue);
    background-color: var(--gallery) !important;
  }

  @media only screen and (max-width: 600px) {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
`

export default GridColumnHeader
