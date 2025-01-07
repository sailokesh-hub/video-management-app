const express = require('express');
const multer = require('multer');
const Video = require('../models/video');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Multer setup for video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Video upload route
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.file.path,
      user: req.user.id,
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's videos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
