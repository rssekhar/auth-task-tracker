
import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
export const store = createContext();

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  return (

    <store.Provider value={[token, setToken]}>
      <Routes>


        <Route index element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </store.Provider>


  );
}

export default App;
