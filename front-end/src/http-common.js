import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000/admin',
    headers: {
        'Content-Type': 'application/json'
    }
});