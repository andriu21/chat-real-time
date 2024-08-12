import React from 'react'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import Auth from "../src/page/Auth/index.jsx";
import Chat from '../src/page/Chat/index.jsx'
import Profile from '../src/page/Profile/index.jsx'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path='/chat' element={ <Chat /> } />
      <Route path='/profile' element={ <Profile /> } />
      <Route path='*' element={ <Navigate to='/auth' /> } /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App