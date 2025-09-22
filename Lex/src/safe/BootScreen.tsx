
const BootScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '0.5rem 1rem',
      backgroundColor: '#1a4d2e',
      color: '#c1ffc1',
      border: '1px solid #2a8d5c',
      borderRadius: '6px',
      zIndex: 9999,
      fontFamily: 'sans-serif',
      fontSize: '0.875rem',
      fontWeight: '600'
    }}>
      Boot OK
    </div>
  );
};

export default BootScreen;
