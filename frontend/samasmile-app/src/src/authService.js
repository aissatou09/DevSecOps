import axios from 'axios';

const API_URL = "http://localhost:8000/api/token/";

export const login = (username, password) => {
  return axios.post(API_URL, {
    username,
    password,
  });
};