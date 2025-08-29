import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormCheck,
  CImage,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilSearch } from '@coreui/icons'

const FilmTable = () => {
  const [films, setFilms] = useState([])
  const [filteredFilms, setFilteredFilms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingFilm, setEditingFilm] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          'https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/products',
        )
        const responseData = JSON.parse(response.data.body)

        if (Array.isArray(responseData)) {
          setFilms(responseData)
          setFilteredFilms(responseData)
        } else {
          console.error('Error: Response data is not an array', responseData)
        }
      } catch (error) {
        console.error('Error fetching films:', error)
      }
    }
    fetchFilms()
  }, [editingFilm])

  const handleEdit = (film) => {
    setEditingFilm(film)
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        'https://e8z9o2hxm4.execute-api.us-east-1.amazonaws.com/dev/Film',
        {
          data: { id },
        },
      )
      console.log(response)
      if (response.status === 200) {
        setFilms(films.filter((film) => film.id !== id))
        setFilteredFilms(filteredFilms.filter((film) => film.id !== id))
        console.log('Deleted film with id:', id)
      } else {
        console.error('Failed to delete film:', response)
      }
    } catch (error) {
      console.error('Error deleting film:', error)
    }
  }

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)
    setFilteredFilms(films.filter((film) => film.name.toLowerCase().includes(term.toLowerCase())))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditingFilm({ ...editingFilm, [name]: value })
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setEditingFilm({ ...editingFilm, filmImage: URL.createObjectURL(file) })
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(
        'https://7r5lw4iss0.execute-api.us-east-1.amazonaws.com/production/product',
        JSON.stringify(editingFilm),
      )
      console.log(response.data)
      if (response.status === 200) {
        const updatedFilm = response.data
        setFilms(films.map((film) => (film.id === updatedFilm.id ? updatedFilm : film)))
        setFilteredFilms(
          filteredFilms.map((film) => (film.id === updatedFilm.id ? updatedFilm : film)),
        )
        setModalVisible(false)
        console.log('Updated film with id:')
      } else {
        console.error('Failed to update film:', response)
      }
    } catch (error) {
      console.error('Error updating film:', error)
    }
  }

  const handleCancel = () => {
    setEditingFilm(null)
    setModalVisible(false)
  }

  return (
    <CCardBody>
      <CRow className="mb-3 align-items-center">
        <CCol md={6}>
          <h3>List of Films</h3>
        </CCol>
        <CCol md={6} className="d-flex justify-content-end align-items-center">
          <CInputGroup style={{ maxWidth: '300px', marginRight: '10px' }}>
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Search films..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </CInputGroup>
          <CButton color="primary" onClick={() => setModalVisible(true)}>
            Add New Film
          </CButton>
        </CCol>
      </CRow>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Select</CTableHeaderCell>
            <CTableHeaderCell>Film Image</CTableHeaderCell>
            <CTableHeaderCell>Film Name</CTableHeaderCell>
            <CTableHeaderCell>Adult Price</CTableHeaderCell>
            <CTableHeaderCell>Child Price</CTableHeaderCell>
            <CTableHeaderCell>Room</CTableHeaderCell>
            <CTableHeaderCell>Number of Places</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Edit</CTableHeaderCell>
            <CTableHeaderCell>Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Array.isArray(filteredFilms) &&
            filteredFilms.map((film) => (
              <CTableRow key={film.id}>
                <CTableDataCell>
                  <CFormCheck />
                </CTableDataCell>
                <CTableDataCell>
  <img src={film.image} alt="Film Image" style={{ width: '100px', height: 'auto' }} />
</CTableDataCell>

                <CTableDataCell>{film.name}</CTableDataCell>
                <CTableDataCell>${film.adultPrice}</CTableDataCell>
                <CTableDataCell>${film.childPrice}</CTableDataCell>
                <CTableDataCell>{film.room}</CTableDataCell>
                <CTableDataCell>{film.numberOfPlaces}</CTableDataCell>
                <CTableDataCell>
  {new Date(film.date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}
</CTableDataCell>
                <CTableDataCell>{film.description}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" onClick={() => handleEdit(film)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDelete(film.id)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>

      <CModal
        size="xl"
        visible={modalVisible}
        onClose={handleCancel}
        aria-labelledby="EditFilmModal"
      >
        <CModalHeader>
          <CModalTitle id="EditFilmModal">{editingFilm ? 'Edit Film' : 'Add New Film'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="name"
                  label="Film Name"
                  value={editingFilm?.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="room"
                  label="Room"
                  value={editingFilm?.room || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="adultPrice"
                  label="Adult Price"
                  value={editingFilm?.adultPrice || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="childPrice"
                  label="Child Price"
                  value={editingFilm?.childPrice || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="number"
                  name="numberOfPlaces"
                  label="Number of Places"
                  value={editingFilm?.numberOfPlaces || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="date"
                  name="date"
                  label="Date"
                  value={editingFilm?.date || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormInput
                  type="textarea"
                  name="description"
                  label="Description"
                  value={editingFilm?.description || ''}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  type="file"
                  name="filmImage"
                  label="Film Image"
                  onChange={handleImageChange}
                />
                {editingFilm?.filmImage && (
                  <CImage src={editingFilm.filmImage} alt="Selected" width={100} height={100} />
                )}
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton color="secondary" onClick={handleCancel}>
                Cancel
              </CButton>
              <CButton color="primary" type="submit">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </CCardBody>
  )
}

export default FilmTable