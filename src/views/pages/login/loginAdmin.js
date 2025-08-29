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
import { signIn } from '../auth'

const LoginAdmin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signIn(username, password)
      // Redirect to the app's main page or dashboard
      setTimeout(() => {
        navigate('/dashboard') // Corrected usage of navigate
      }, 3000) // Removed unnecessary array brackets
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
            style={{ marginTop: '30px', marginBottom: '30px' }} // Removed marginLeft
          >
            {/* Consider adding a logo or other content here */}
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
                    {error && <p className="text-danger">{error}</p>} {/* Display error message */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{ backgroundColor: '#5183a4', borderColor: '#5183a4' }}
                          className="px-4"
                          type="submit" // Added type for form submission
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
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginAdmin
