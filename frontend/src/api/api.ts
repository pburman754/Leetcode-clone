import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  register: (username: string, email: string, password: string) =>
    axios.post(`${API_BASE_URL}/auth/register`, { username, email, password }),
  
  login: (email: string, password: string) =>
    axios.post(`${API_BASE_URL}/auth/login`, { email, password }),

  // User
  getCurrentUser: () =>
    axios.get(`${API_BASE_URL}/users/me`, { headers: getAuthHeader() }),
  
  getLeaderboard: () =>
    axios.get(`${API_BASE_URL}/users/leaderboard`),
  
  getUserProfile: (username: string) =>
    axios.get(`${API_BASE_URL}/users/${username}`),

  // Problems
  getProblems: () =>
    axios.get(`${API_BASE_URL}/problems`),
  
  getProblem: (id: number) =>
    axios.get(`${API_BASE_URL}/problems/${id}`),
  
  submitSolution: (id: number, code: string, language: string) =>
    axios.post(
      `${API_BASE_URL}/problems/${id}/submit`,
      { code, language },
      { headers: getAuthHeader() }
    ),
  
  getSubmissions: (id: number) =>
    axios.get(`${API_BASE_URL}/problems/${id}/submissions`, { headers: getAuthHeader() }),
  
  getNote: (id: number) =>
    axios.get(`${API_BASE_URL}/problems/${id}/note`, { headers: getAuthHeader() }),
  
  saveNote: (id: number, content: string) =>
    axios.post(
      `${API_BASE_URL}/problems/${id}/note`,
      { content },
      { headers: getAuthHeader() }
    ),
};