import React from 'react'
import styled from 'styled-components'
import QuestionContainer from './questionContainer'
import Question from './question'
import Answer from './answer'

const StyledDiv = styled.div`
  width: 90%;
  max-width: 700px;
  margin: 80px auto 0;
  font-family: "Quicksand", sans-serif;

  & a, & a:visited {
    color: #0071a6;
  }

  & a:hover {
    color: #003e5c;
  }
`

const StyledH = styled.h1`
  font-size: 30px;
  margin: 0 0 20px 0;
`

function About() {

  const faq = {
    "Is this official?": "No, this is not official. However, the data is from official sources. Look below for more info.",
    "Who are you?": "My name is Shreyas, and I am a student currently in the 11th grade and studying at Delhi Public School Bangalore East in Bangalore.",
    "What are your sources?": `
      Sources for the respective cities are:
      <br>
      <b>Bengaluru</b>: <a href="https://apps.bbmpgov.in/covidbedstatus/">BBMP (Bruhat Bengaluru Mahanagara Palike)</a>
    `,
    "How often is the data updated?": "The data is fetched from the sources every few hours, but it is updated only when the data has changed.",
    "Can I get access to the data?": "I am currently working on an API so that everyone can get access and make use of this data.",
    "Can I contribute?": "Yes, you can! Email me at <a href='mailto:shreyas.sreenivasa@gmail.com'>shreyas.sreenivasa@gmail.com</a>",
    "Is this only for Bengaluru?": "Currently yes it is only for Bengaluru. However, we are looking to expand to other cities quickly."
  }

  const items = Object.keys(faq).map((question, index) => {
    return (
      <QuestionContainer key={index}>
        <Question>
          {question}
        </Question>
        <Answer>
          {faq[question]}
        </Answer>
      </QuestionContainer>
    )
  })

  return (
    <StyledDiv>
      <StyledH>
        About
      </StyledH>
      {items}
    </StyledDiv>
  )
}

export default About