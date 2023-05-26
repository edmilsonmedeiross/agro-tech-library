import axios from 'axios';

const BASE_URL = process.env.PUBLIC_NEXT_API_URL || 'htpp://localhost:3000'

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});