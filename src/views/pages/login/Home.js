import React from 'react'
import { CButton, CContainer, CRow, CCol } from '@coreui/react'
import logo from 'src/images/about-img.png'

const Home = () => {
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [uploadStatus, setUploadStatus] = React.useState('')
  const [files, setFiles] = React.useState([]) // for displaying EFS files

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setUploadStatus('')
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.')
      return
    }
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await fetch('/api/upload-shared', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setUploadStatus('File uploaded successfully!')
        fetchFiles() // refresh file list after upload
      } else {
        setUploadStatus(data.error || 'Upload failed.')
      }
    } catch (err) {
      setUploadStatus('Upload failed.')
    }
  }

  // Fetch files from backend
  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/list-files')
      const data = await res.json()
      if (res.ok) {
        setFiles(data.files)
      } else {
        console.error('Failed to fetch files:', data.error)
      }
    } catch (err) {
      console.error('Error fetching files:', err)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center" style={{ minHeight: '100vh', position: 'relative', paddingBottom: '70px' }}>
      {/* Navbar */}
      <nav style={{ width: '100%', background: '#5183a4', padding: '10px 0', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <CContainer className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src={logo} alt="SFM Drive Logo" style={{ height: '40px', marginRight: '15px' }} />
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px' }}>SFM Drive</span>
          </div>
        </CContainer>
      </nav>
      {/* Upload / File section */}
      <CContainer>
        <CRow className="justify-content-center mb-3">
          <CCol md={4} className="text-center" style={{ marginTop: '30px' }}>
            <img src={logo} alt="SFM Drive Logo" style={{ maxWidth: '100%' }} />
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol md={8} className="text-center">
            <h1>Welcome to SFM Drive!</h1>
            <p>Manage your files and see what’s shared with you.</p>

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
              {/* Upload Button */}
              <CButton style={{ backgroundColor: '#e67e30', borderColor: '#e67e30', color: '#fff', padding: '20px 40px', fontSize: '1.2rem' }}
                       onClick={() => document.getElementById('fileInput').click()}>
                Select File
              </CButton>
              <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              {selectedFile && (
                <CButton style={{ marginTop: '10px', backgroundColor: '#5183a4', color: '#fff' }} onClick={handleUpload}>
                  Upload File
                </CButton>
              )}
              {uploadStatus && <div style={{ marginTop: '10px', color: uploadStatus.includes('success') ? 'green' : 'red' }}>{uploadStatus}</div>}

              {/* List Files Button */}
              <CButton style={{ marginTop: '20px', backgroundColor: '#2ecc71', color: '#fff' }} onClick={fetchFiles}>
                Show All Files
              </CButton>

              {/* Display Files */}
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                {files.length > 0 ? (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No files in EFS yet.</p>
                )}
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>

      {/* Footer */}
      <footer style={{ width: '100%', background: '#5183a4', color: '#fff', textAlign: 'center', padding: '15px 0', position: 'fixed', left: 0, bottom: 0, zIndex: 100 }}>
        © {new Date().getFullYear()} SFM Drive. All rights reserved. | Secure File Management
      </footer>
    </div>
  )
}

export default Home
