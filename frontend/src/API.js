import axios from 'axios';

const deploy = true
export const API_URL = deploy ? 'https://starbucks-backend.onrender.com' : 'http://localhost:3001'

export default axios.create({
    baseURL: API_URL
});


