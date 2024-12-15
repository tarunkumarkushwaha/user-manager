import { useState, useEffect } from 'react';

const LoadingIcon = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 10) % 360);
    }, 50); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 50 50"
    >
      <circle 
        cx="25" 
        cy="25" 
        r="20" 
        strokeDasharray="70" 
        strokeDashoffset={angle} 
        stroke="#3182ce" 
        strokeWidth="4" 
        fill="none" 
      />
    </svg>
  );
};

export default LoadingIcon;