// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/Store'; // Store path might need adjustment
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './routes/Root';
import Contact from './pages/Contact';
import Mock from './features/mockFeature/Mock';
import Blocker from './components/Blocker';
import Use from "./components/Use";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="contacts/:contactId" element={<Contact />} />
            <Route path="mock" element={<Mock />} />
            <Route path="blocker" element={<Blocker />} />
            <Route path="use" element={<Use />} />
            <Route path="*" element={<Use />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
