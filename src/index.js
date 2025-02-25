import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import All_Weather from './Weather_App/All_Weather'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryclient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
    <All_Weather />
    </QueryClientProvider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
