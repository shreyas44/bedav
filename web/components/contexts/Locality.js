import React from 'react'

const LocalityContext = React.createContext()

export function LocalityProvider(props) {
  return (
    <LocalityContext.Provider value={props.initial}>
      {props.children}
    </LocalityContext.Provider>
  )
}

export default LocalityContext
