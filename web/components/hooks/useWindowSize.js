import React, {useState, useLayoutEffect} from 'react'

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    document.addEventListener('resize', updateSize);
    updateSize();
    return () => document.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowSize
