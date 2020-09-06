function useLocality() {
  return window.location.pathname.slice(1,-1)
}

export default useLocality
