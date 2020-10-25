import styled from 'styled-components'

const GridCell = styled.div`
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({counter}) => counter % 2 == 0 ? "var(--alabaster)" : "white"};
  color: ${({ colorTheme, children }) => children == "N.A." ? "var(--alto)" : colorTheme == "green" ? "var(--fun-green)" : colorTheme === "red" ? "var(--mojo)" : colorTheme === "blue" ? "rgb(0, 66, 102)": null};


  @media only screen and (max-width: 600px) {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    font-family: "Quicksand", sans-serif;
  }
`

export default GridCell
