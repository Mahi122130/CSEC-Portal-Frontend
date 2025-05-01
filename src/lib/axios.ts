import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: string) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      token && prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Simple toast implementation
const showToast = (message: string, isError: boolean = true) => {
  // Remove existing toast if any
  const existingToast = document.getElementById('custom-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 24px';
  toast.style.backgroundColor = isError ? '#f44336' : '#4CAF50';
  toast.style.color = 'white';
  toast.style.borderRadius = '4px';
  toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  toast.style.zIndex = '9999';
  toast.style.animation = 'fadein 0.5s, fadeout 0.5s 4.5s';

  // Add styles for animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadein {
      from { right: -100px; opacity: 0; }
      to { right: 20px; opacity: 1; }
    }
    @keyframes fadeout {
      from { right: 20px; opacity: 1; }
      to { right: -100px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, 5000);

  document.body.appendChild(toast);
};

// Request interceptor
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        Cookies.set('accessToken', data.accessToken);
        if (data.refreshToken) {
          Cookies.set('refreshToken', data.refreshToken, { expires: 7 });
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('role');
        
        showToast('Your session has expired. Please log in again.');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response) {
      const { status, data } = error.response;
      
      let errorMessage = 'An error occurred';
      if (data?.message) {
        errorMessage = data.message;
      } else {
        switch (status) {
          case 400: errorMessage = 'Bad request'; break;
          case 403: errorMessage = 'You are not authorized'; break;
          case 404: errorMessage = 'Resource not found'; break;
          case 500: errorMessage = 'Server error'; break;
          default: errorMessage = `Error: ${status}`;
        }
      }
      
      showToast(errorMessage);
    } else if (error.request) {
      showToast('Network error - please check your connection');
    } else {
      showToast('Request error - please try again');
    }

    return Promise.reject(error);
  }
);

export default api;