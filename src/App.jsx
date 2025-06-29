import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'

const App = () => {
  
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentuser', JSON.stringify(currentUser));
    }else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser])

  const heandleAuthSubmit = data => {
    const user = {
      email : data.email,
      name: data.name || 'User',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`
    }
    setCurrentUser(user);
    navigate('/', {replace: true})
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login', {replace: true})
  }
  return (
    <Routes>
      <Route path='/' element={}
    </Routes>
  )
}

export default App
