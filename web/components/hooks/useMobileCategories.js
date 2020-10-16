import { useContext } from 'react'
import data from '../extra'
import LocalityContext from '../contexts/Locality'

function useMobileCategories() {
  const locality = useContext(LocalityContext)
  return data.localities[locality] ? data.localities[locality].mobileCategories : []
}

export default useMobileCategories
