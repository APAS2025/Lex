import React from 'react';
import ReactDOM from 'react-dom/client';
import { SafeApp } from './src/safe/SafeApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SafeApp />
  </React.StrictMode>
);