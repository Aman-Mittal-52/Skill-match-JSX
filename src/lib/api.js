import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging and adding auth token
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method.toUpperCase(), config.url);
        
        // Get token from localStorage if it exists
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.message,
        });
        
        // Handle specific error cases
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        
        return Promise.reject(error);
    }
);

// API methods
const apiService = {
    // GET request
    get: async (url, params = {}) => {
        try {
            const response = await api.get(url, { params });
            return response.data;
        } catch (error) {
            console.error('GET Request Failed:', url, error);
            throw error;
        }
    },

    // POST request
    post: async (url, data = {}) => {
        try {
            const response = await api.post(url, data);
            return response.data;
        } catch (error) {
            console.error('POST Request Failed:', url, error);
            throw error;
        }
    },

    // PUT request
    put: async (url, data = {}) => {
        try {
            const response = await api.put(url, data);
            return response.data;
        } catch (error) {
            console.error('PUT Request Failed:', url, error);
            throw error;
        }
    },

    // DELETE request
    delete: async (url) => {
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            console.error('DELETE Request Failed:', url, error);
            throw error;
        }
    },

    // PATCH request
    patch: async (url, data = {}) => {
        try {
            const response = await api.patch(url, data);
            return response.data;
        } catch (error) {
            console.error('PATCH Request Failed:', url, error);
            throw error;
        }
    },
};

export default apiService; 


// import apiService from '../lib/api';

// // Example usage:
// try {
//     const data = await apiService.get('/users');
//     console.log('Users:', data);
// } catch (error) {
//     console.error('Failed to fetch users:', error);
// }