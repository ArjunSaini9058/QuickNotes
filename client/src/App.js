import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import AddNote from './components/notes/AddNote';
import EditNote from './components/notes/EditNote';
function App() {
  const [user,setLoginUser]=useState({})
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user && user._id ? <Home user={user} setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />}/>
          <Route path="/register" element={<Register setLoginUser={setLoginUser} />} />
          <Route path="/addnote" element={user && user._id ?<AddNote user={user} setLoginUser={setLoginUser} />:<Login setLoginUser={setLoginUser}/>} />
          {/* <Route path="/addnote" element={<AddNote />}/> */}
          <Route path="/editnote/:id" element={user && user._id ?<EditNote user={user} setLoginUser={setLoginUser} />:<Login setLoginUser={setLoginUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
