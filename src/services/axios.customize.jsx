import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('>>>>>>>> check response from inceptors:', response);
    if (response.data && response.data.data) {
        return response.data;
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;