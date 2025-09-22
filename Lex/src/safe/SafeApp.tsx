import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import BootScreen from './BootScreen';
import DiagnosticsOverlay from './DiagnosticsOverlay';

// Lazily import the main App to isolate crashes during its initialization
const RealApp = lazy(() => import('../../App'));

export function SafeApp() {
  return (
    <ErrorBoundary>
      <BootScreen />
      <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem', fontSize: '1.25rem' }}>Loading Application...</div>}>
        <RealApp />
      </Suspense>
      <DiagnosticsOverlay />
    </ErrorBoundary>
  );
}
