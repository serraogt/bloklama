// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/Store'; // Store path might need adjustment
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Root, { loader, action as rootAction, loader  as rootLoader} from './routes/Root';
import Contact, { loader as contactLoader } from './routes/Contact';
import Mock from './features/mockFeature/Mock';
import Blocker from './components/Blocker';
import Use from "./components/Use";
import EditContact, { action as editAction} from './routes/Edit';


const router = createBrowserRouter([
  {path: "/",
    element: <Root />,
    // errorElement iyi özellik
    loader: rootLoader,
    action: rootAction,
    children: [
      {path: "contacts/:contactId",
      element: <Contact />,
      loader: contactLoader},

      {path: "contacts/:contactId/edit",
      element: <EditContact/>,
      loader: contactLoader,
      action: editAction}
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
        {/* <Routes>
          <Route path="/" element={<Root />}>
            <Route path="contacts/:contactId" element={<Contact />} />
            <Route path="mock" element={<Mock />} />
            <Route path="blocker" element={<Blocker />} />
            <Route path="use" element={<Use />} />
            <Route path="*" element={<Use />} />
          </Route>
        </Routes>
   */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
