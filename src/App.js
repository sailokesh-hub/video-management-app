import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
const App = () => {
  return (
    <Router>
      <div>
        <nav className='navbar'>
          <Link to="/login">Login</Link>
          <Link to="/upload">Upload Video</Link>
          <Link to="/videos">My Videos</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/videos" element={<MyVideos />} />
        </Routes>
      </div>
    </Router>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Store JWT
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginUser}>Login</button>
    </div>
  );
};

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const uploadVideo = async () => {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/video/upload', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={uploadVideo}>Upload</button>
    </div>
  );
};

const MyVideos = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      // Use your Pexels API key here
      const apiKey = 'fMzZpoUFsQPrwqlSBSlYDmLWnzBunCoRMZj8Lh821iwhTCafpHzDnt5b';
      const res = await axios.get('https://api.pexels.com/videos/popular?per_page=10', {
        headers: { Authorization: apiKey },
      });
      // Pexels API provides video files in a nested format
      const formattedVideos = res.data.videos.map((video) => ({
        _id: video.id,
        title: video.user.name, // Pexels doesn't provide a title, using user name as a placeholder
        description: video.user.url, // Using user URL as a placeholder
        videoUrl: video.video_files[0].link, // Getting the first available video file
      }));
      setVideos(formattedVideos);
    } catch (error) {
      console.log('Error fetching videos:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>My Videos</h2>
      <button onClick={getVideos}>Fetch Videos</button>
      {videos.map((video) => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <video controls>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default App;
