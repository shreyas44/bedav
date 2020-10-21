import { useContext } from 'react'
import data from '../extra'
import LocalityContext from '../contexts/Locality'

function useCategories() {
  const locality = useContext(LocalityContext)
  return data.localities[locality] ? data.localities[locality].categories : []
}

export default useCategories
