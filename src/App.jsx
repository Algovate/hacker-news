import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Feed = lazy(() => import('./pages/Feed'));
const Stats = lazy(() => import('./pages/Stats'));

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Suspense fallback={<div className="route-loading glass-panel">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/top" replace />} />
              <Route path="/:feedType" element={<Feed />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
