import axios from 'axios';

const API_URL = "http://41.214.51.109:8000/api/token/";

export const login = (username, password) => {
  return axios.post(API_URL, { username, password });
};
