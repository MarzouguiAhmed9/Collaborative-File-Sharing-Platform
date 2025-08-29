import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/bootstrap.css';
import '../../../css/font-awesome.min.css';
import '../../../css/style.css';
import '../../../css/responsive.css';
import logo from '../../../images/about-img.png';
import { getCurrentUser, updateUser } from '../auth';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser} from '@coreui/icons';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const mapRef = useRef(null);

  const handleLocationClick = (event) => {
    event.preventDefault();
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUsername(data.username || '');
        setName(data.name || '');
        setEmail(data.email || '');
      })
      .catch((error) => console.error('Failed to fetch user:', error));
  }, []);

  const handleSave = async () => {
    if (!password) {
      alert('Please enter your password to update your profile.');
      return;
    }
  
    try {
      await updateUser({ username, email, name, currentPassword: password, newPassword: password });
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error.message, error.stack);
      alert('Failed to update profile.');
    }
  };
  

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login'); // Example redirect to login page
  };

  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="header_top">
          <div className="container-fluid header_top_container">
            <a className="navbar-brand" href="index.html">
              <img src={logo} alt="SFM Drive Logo" style={{ height: '60px' }} />
            </a>
            <div className="contact_nav">
              <a href="#" onClick={handleLocationClick}>
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>Location</span>
              </a>
              <a href="tel:+21675888000">
                <i className="fa fa-phone" aria-hidden="true"></i>
                <span>Call: +216 75888000</span>
              </a>
              <a href="mailto:cineclick@gmail.com">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <span>cineclick@gmail.com</span>
              </a>
            </div>
            <div className="social_box">
              <a href="#" aria-label="Facebook">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand navbar_brand_mobile" href="index.html">
                Tro<span>Weld</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html" onClick={(e) => { e.preventDefault(); aboutRef.current.scrollIntoView({ behavior: 'smooth' }) }}>
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="service.html">
                      Reservations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="portfolio.html">
                      Films
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <span>Profile</span>
                    </a>
                  </li>
                  <form className="form-inline">
                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section className="about_section layout_padding">
        <div className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>User Profile</h1>
                        <p className="text-body-secondary">View or update your profile information</p>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                          <div>
                            <label>Name:</label>
                            <CFormInput
                              type="text"
                              value={name}
                              disabled={!isEditing}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label>Email:</label>
                            <CFormInput
                              type="email"
                              value={email}
                              disabled={!isEditing}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          {isEditing && (
                            <>
                              <div>
                                <label>Mot de passe actuel:</label>
                                <CFormInput
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div>
                                <label>Nouveau mot de passe:</label>
                                <CFormInput
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                              </div>
                              <div>
                                <label>Confirmer le nouveau mot de passe:</label>
                                <CFormInput
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                              </div>
                            </>
                          )}
                          <CButton
                            color="primary"
                            onClick={() => setIsEditing(!isEditing)}
                            className="me-2"
                          >
                            {isEditing ? 'Cancel' : 'Edit'}
                          </CButton>
                          {isEditing && (
                            <CButton
                              color="success"
                              onClick={handleSave}
                            >
                              Save
                            </CButton>
                          )}
                        </div>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white py-5 d-flex flex-column justify-content-center align-items-center"
                    style={{ background: '#e67e30' }}
                  >
                    <CCardBody className="text-center">
                      <CIcon icon={cilUser} size="5xl" />
                      <div>
                        <CButton
                          color="light"
                          className="mt-3"
                          onClick={handleLogout}
                        >
                          <CIcon className="me-2" />
                          Logout
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </section>
    </div>
  );
};

export default Profile;
