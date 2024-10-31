import axios from 'axios';
// import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        if (response && response.data) return response.data;
        return response;
    }
), function (error) {
    return Promise.reject(error);
};

export default instance;
