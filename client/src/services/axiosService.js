import axios from 'axios';

class AxiosService {
    userAxios;
    guestAxios;
    baseURL = 'http://localhost:5000/api';

    constructor() {
        this.guestAxios = axios.create({
            baseURL: this.baseURL,
        });
    }

    setUserAxios(token){
        this.userAxios = axios.create({
            baseURL: this.baseURL,
            headers: {
                Authorization: token,
            }
        });
    }
}

const axiosService = new AxiosService();

export default function getAxiosInstans(){
    return axiosService;
}