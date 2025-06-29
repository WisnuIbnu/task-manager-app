import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'


const App = () => {
  
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
    navigate('/', { replace: true })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login', { replace: true })
  }

  const ProtectedLayout = () => {
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  }
  return (
    <Routes>

      <Route path='/login' element={<div>
        <Login onSubmit={heandleAuthSubmit} onSwitchMode={() => navigate('/signup')} />
      </div>} />

      <Route path='/signup' element={<div>
        <SignUp onSubmit={heandleAuthSubmit} onSwitchMode={() => navigate('/login')} />
      </div>} />

        <Route path='/' element={<Layout/>} />
    </Routes>
  )
}

export default App
