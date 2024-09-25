import { useState, useEffect } from 'react';

export const useCurrentWidth = () => {

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth)

  useEffect(() => {

    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    currentWidth,
    sm: currentWidth >= 640,
    md: currentWidth >= 768,
    lg: currentWidth >= 1024,
    xl: currentWidth >= 1280,
    xxl: currentWidth >= 1536
  };
};