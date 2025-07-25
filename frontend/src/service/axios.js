// src/api/axios.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});