
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const LoginAdmin = React.lazy(() => import('./views/pages/login/loginAdmin'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ConfirmSignUp = React.lazy(() => import('./views/pages/register/ConfirmlSignUp'))
const Profile = React.lazy(() => import('./views/pages/login/profile'))
const Profilee = React.lazy(() => import('./views/pages/login/profilee'))
const Home = React.lazy(() => import('./views/pages/login/Home'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmSignUp" element={<ConfirmSignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilee" element={<Profilee />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App