import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './Navigation';
import IndexSearch from './search/indexSearch';
import IndexHome from './home/indexHome';
import DetailSearch from './search/detailSearch';
import IndexFilter from './filter/indexFilter';
import About from './about/aboutPage';
import LoginProvider from './context/LoginContext';
import Login from './login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
  <BrowserRouter>
      <LoginProvider>
      <Navigation/>
          <Routes>
      
          
          <Route path="home" element={< IndexHome/>} />
          <Route path="countrySearch" element={< IndexSearch/>} />
          <Route path="countrySearch/:name" element={<DetailSearch />} />
          <Route path="countryFilter" element={<IndexFilter />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          
          
         
      
      </Routes>
      
      </LoginProvider>
 
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
