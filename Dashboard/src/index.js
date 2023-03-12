import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, HashRouter, Redirect, Navigate,Routes } from "react-router-dom";
import PatientsList from './components/PatientsList/PatientsList';
import Header from './components/Header/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Header />      
      <div className="containet">
            <Routes>
                <Route path="/" element={<Navigate to="/app" replace />} />
                <Route path="/app" element={<App/>} />
                <Route path="/patientslist" element={<PatientsList/>} />
            </Routes>   
        </div>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
