import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Submissions from './Submissions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/submissions" element={<Submissions />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);