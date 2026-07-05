import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': import.meta.env.VITE_API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 429) {
        console.error('Rate limit exceeded.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
