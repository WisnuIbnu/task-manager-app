import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PendingPage from './pages/PendingPage'
import CompletePage from './pages/CompletePage'
import ManageUser from './pages/ManageUser'
import Profile from './components/Profile'


const App = () => {
  
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
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
      role: data.role,
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

  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  )

  return (
    <Routes>

      <Route path='/login' element={<div >
        <Login onSubmit={heandleAuthSubmit} onSwitchMode={() => navigate('/signup')} />
      </div>} />

      <Route path='/signup' element={<div>
        <SignUp onSubmit={heandleAuthSubmit} onSwitchMode={() => navigate('/login')} />
      </div>} />

      <Route element={currentUser ? <ProtectedLayout /> :         
        <Navigate to='/login' replace/>}>
      
        <Route path='/' element={<Dashboard />} />
        <Route path='/pending' element={<PendingPage />} />
        <Route path='/complete' element={<CompletePage />} />
          {role === 'admin' && (
            <Route path='/manage-user' element={<ManageUser/>} />
          )}
        <Route path='/profile' element={<Profile user={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />} />
      </Route>

      <Route path='*' element={<Navigate to={currentUser ? '/' : '/login' } replace />} />

    </Routes>
  )
}

export default App
