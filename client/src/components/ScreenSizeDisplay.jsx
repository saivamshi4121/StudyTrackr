import { useState, useEffect } from 'react';

const ScreenSizeDisplay = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-2 rounded-lg text-xs font-mono z-50 shadow-lg">
      <div>Viewport: {dimensions.width} × {dimensions.height}px</div>
      <div className="text-gray-400 mt-1">
        Screen: {typeof window !== 'undefined' ? screen.width : 0} × {typeof window !== 'undefined' ? screen.height : 0}px
      </div>
    </div>
  );
};

export default ScreenSizeDisplay;

