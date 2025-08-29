import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from 'src/images/about-img.png' // Import your logo image
import { signIn } from '../auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signIn(username, password)
      setTimeout(() => {
        navigate('/home')
      }, 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center">
      <CContainer>
        <CRow className="justify-content-center mb-3">
          <CCol
            md={4}
            className="text-center"
            style={{ marginTop: '30px', marginBottom: '30px' }}
          >
            <img src={logo} alt="SFM Drive Logo" style={{ maxWidth: '100%' }} /> {/* Logo Image */}
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {error && <p className="text-danger">{error}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#5183a4', borderColor: '#5183a4' }}
                          className="px-4"
                          type="submit"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5"
                style={{ width: '44%', backgroundColor: '#e67e30' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <br></br>
                    <p>Welcome to SFM Drive, your gateway to an amazing cinematic experience!</p>
                    <Link to="/register">
                      <CButton
                        style={{
                          backgroundColor: '#417495',
                          borderColor: '#417495',
                          color: '#ffffff',
                        }}
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
