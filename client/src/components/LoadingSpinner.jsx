const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  const spinnerStyle = {
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid #007bff`,
    borderRadius: '50%',
    width: spinnerSize,
    height: spinnerSize,
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
  };

  const containerStyle = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9998,
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;

