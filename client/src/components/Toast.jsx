import { useEffect } from 'react';

const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      animation: 'slideIn 0.3s ease-out',
    };

    const typeStyles = {
      error: {
        backgroundColor: '#fee',
        color: '#c33',
        border: '1px solid #fcc',
      },
      success: {
        backgroundColor: '#efe',
        color: '#3c3',
        border: '1px solid #cfc',
      },
      warning: {
        backgroundColor: '#ffe',
        color: '#cc3',
        border: '1px solid #ffc',
      },
      info: {
        backgroundColor: '#eef',
        color: '#33c',
        border: '1px solid #ccf',
      },
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  return (
    <div style={getToastStyles()}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginLeft: '1rem',
          color: 'inherit',
          opacity: 0.7,
        }}
      >
        ×
      </button>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Toast;

