import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Terms from './views/unauthenticated/legal/Terms';
import Privacy from './views/unauthenticated/legal/Privacy';
import NotFound from './views/unauthenticated/not-found/NotFound';
import Landing from './components/landing/Landing';

import './App.scss';
import './components/global-styles/button.scss';
import './components/global-styles/inputText.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/terms-of-use" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
