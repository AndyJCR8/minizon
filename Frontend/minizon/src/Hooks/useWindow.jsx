import { useState, useEffect } from 'react'

export default function useWindow() {
  const [windowSize, setWindowSize] = useState({
    Width:  window.innerWidth,
    Height: window.innerHeight
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({ Width:  window.innerWidth, Height: window.innerHeight });
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return windowSize;
}
