import React, { useState } from 'react'

const LocalityContext = React.createContext()

export function LocalityProvider(props) {
  const [locality, setLocality] = useState(props.initial)

  return (
    <LocalityContext.Provider value={{locality, setLocality}}>
      {props.children}
    </LocalityContext.Provider>
  )
}

export default LocalityContext
