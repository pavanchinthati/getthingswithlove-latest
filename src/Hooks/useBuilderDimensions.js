import { useState, useEffect } from 'react';

export default function useBuilderDimensions() {
  const [builderDimensions, setBuilderDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setBuilderDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial call to ensure state is in sync
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return builderDimensions;
}