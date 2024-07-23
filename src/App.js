import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mock from './features/mockFeature/Mock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mock' element={<Mock />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
