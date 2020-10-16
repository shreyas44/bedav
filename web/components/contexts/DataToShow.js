import React, {useState} from 'react'

const DataToShowContext = React.createContext()

export function DataToShowProvider(props) {
  const [dataToShow, setDataToShow] = useState("available")

  return (
    <DataToShowContext.Provider value={{dataToShow, setDataToShow}}>
      {props.children}
    </DataToShowContext.Provider>
  )
}

export default DataToShowContext
