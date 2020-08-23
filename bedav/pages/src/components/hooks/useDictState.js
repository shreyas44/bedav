import Recat, { useState } from 'react'

function useDictState(initialState) {
  const [state, setState] = useState({...initialState})

  function setDictState(newState) {
    setState({
      ...state,
      ...newState
    })
  }

  return [state, setDictState]
}

export default useDictState