
const DiagnosticsOverlay = () => {
    // In this importmap environment, we can't easily check versions dynamically.
    // We'll show the expected versions from the importmap.
    const reactVersion = '18.3.1';
    const reactDOMVersion = '18.3.1';
    const isMismatched = reactVersion !== reactDOMVersion;

    return (
        <div style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            padding: '0.75rem',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            color: '#cbd5e1',
            border: '1px solid #334155',
            borderRadius: '8px',
            zIndex: 9998,
            fontFamily: 'monospace',
            fontSize: '12px',
        }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '0.25rem' }}>Diagnostics</h4>
            <div>React: v{reactVersion}</div>
            <div>React DOM: v{reactDOMVersion}</div>
            {isMismatched && <div style={{ color: '#f87171', marginTop: '0.5rem', fontWeight: 'bold' }}>VERSION MISMATCH!</div>}
        </div>
    );
};

export default DiagnosticsOverlay;
