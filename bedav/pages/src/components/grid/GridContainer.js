import styled from 'styled-components'

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({columnTemplate}) => columnTemplate};
  grid-gap: 5px;
  font-size: 16px;
  position: relative;

  @media only screen and (max-width: 600px) {
    grid-template-columns: ${({mobileColumnTemplate}) => mobileColumnTemplate};
    overflow-x: scroll;
    grid-gap: 3px;
  }
`

export default GridContainer
