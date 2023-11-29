import axios from 'axios'
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

instance.defaults.withCredentials = true
//   Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU1Njg0YTY4NjFhMDJkNmNjMDZhN2FiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDA4Njg4NzIsImV4cCI6MTc4NzI2ODg3Mn0.AtSy4KUrnVkV1QWsG2hHRhR7_ov0QV9HniThjHUAd3E`;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU1Njg0YTY4NjFhMDJkNmNjMDZhN2FiIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MDExMjE0MDAsImV4cCI6MTc4NzUyMTQwMH0.xjtDIc2lQce_9yRIwMK1Iyd4Ku9WWQ92os0ULQafkBk';
  config.headers['Authorization'] = `Bearer ${access_token}`;
  config.headers['Content-Type'] = 'application/json';


  return config;
}, function (err) {
  // Do something with request error
  return Promise.reject(err);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (err) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const status = err && err.response && err.response.status || 500;

  switch (status) {
    // authentication (token related issues)
    case 401: {
      toast.error('Bạn chưa xác thật người dùng')
      // window.location.href = "/login"
      return err.response.data;
    }

    // forbidden (permission related issues)
    case 403: {
      toast.error('Bạn không có quyền hạn, làm ơn đăng nhập...')
      return Promise.reject(err);
    }

    // bad request
    case 400: {
      return Promise.reject(err);
    }

    // not found
    case 404: {
      return Promise.reject(err);
    }

    // conflict
    case 409: {
      return Promise.reject(err);
    }

    // unprocessable
    case 422: {
      return Promise.reject(err);
    }

    // generic api error (server related) unexpected
    default: {
      return Promise.reject(err);
    }
  }
  return Promise.reject(err);
});
export default instance