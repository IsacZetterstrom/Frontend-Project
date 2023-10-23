import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styling/main.scss";
import { pages } from './router/routes';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: pages
  }
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);