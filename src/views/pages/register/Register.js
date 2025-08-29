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
import logo from 'src/images/about-img.png'
import { signUp } from '../auth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await signUp(username, email, password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/ConfirmSignUp')
      }, 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>SignUp successful!</h2>
        <p>Please check your email for the confirmation code.</p>
        <CButton
          style={{ backgroundColor: '#5183a4', borderColor: '#5183a4', color: '#ffffff', marginTop: '20px' }}
          onClick={() => navigate('/home')}
        >
          Go to Home
        </CButton>
      </div>
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center">
      <CContainer>
        <CRow className="justify-content-center mb-3">
          <CCol
            md={4}
            className="text-center"
            style={{ marginTop: '30px' }}
          >
            <img src={logo} alt="SFM Drive Logo" style={{ maxWidth: '100%' }} />
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-body-secondary">Create your account</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton
                        type="submit"
                        style={{
                          backgroundColor: '#5183a4',
                          borderColor: '#5183a4',
                          color: '#ffffff',
                        }}
                      >
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-flex justify-content-center align-items-center"
                style={{ width: '44%', backgroundColor: '#e67e30' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <br></br>
                    <br></br>
                    <h2>Login</h2>
                    <br></br>
                    <p>Already have an account?</p>
                    <p>Sign in to your account.</p>
                    <Link to="/login">
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
                        Login Now!
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

export default Register