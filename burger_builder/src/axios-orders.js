import Axios from "axios";


const axiosInstance = Axios.create({
    baseURL: "https://react-my-burger-65ec3.firebaseio.com/"
})

axiosInstance.interceptors.request.use(
    request => {
        console.log(request);
        return request;}, 
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => {
        console.log(response);
        return response;}, 
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

export default axiosInstance;