import axios from 'axios';

const backendClient = () => {
  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return api;
};
export const api = backendClient();