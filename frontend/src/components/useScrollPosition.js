// hooks/useScrollPosition.js
import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;
      setIsBottom(currentScroll + 50 >= scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isBottom;
};

export default useScrollPosition;
