import { useContext } from 'react'
import data from '../extra'
import LocalityContext from '../contexts/Locality'

function useColumns() {
  const locality = useContext(LocalityContext)
  console.log(data.columns[locality])
  return data.columns[locality] ? data.columns[locality] : []
}

export default useColumns
