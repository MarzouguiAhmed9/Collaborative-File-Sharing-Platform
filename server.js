const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5001

// Use diskStorage to keep original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/mnt/efs'),
  filename: (req, file, cb) => cb(null, file.originalname)
})

const upload = multer({ storage })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Upload endpoint
app.post('/api/upload-shared', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ message: 'File uploaded successfully', filename: req.file.originalname })
})

// ✅ List files in EFS
app.get('/api/list-files', (req, res) => {
  const efsPath = '/mnt/efs'
  fs.readdir(efsPath, (err, files) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ files })
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
