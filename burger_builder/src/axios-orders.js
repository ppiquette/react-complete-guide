import Axios from "axios";


const axiosInstance = Axios.create({
    baseURL: "https://react-my-burger-65ec3.firebaseio.com/"
})

export default axiosInstance;