import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as packageConfig from '../../package.json';

class interceptor {

    constructor(){
        this.TOKEN = window.localStorage.getItem('token');
    }

    authAxios(){
        let axi = axios.create({
            baseURL: packageConfig.configuration.KnowledgeBaseAPI,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                Accept: 'application/json',
                ContentType: 'application/json'
            }
        });
        axi.interceptors.response.use((response) => {
            return response
        }, error => {
            if (error.response.status === 401) {
                window.location = packageConfig.configuration.BaseFolderName + "/unauthorized"
            }
            return Promise.reject(error)
        })
        return axi;
    }

    authAxiosFormData(){
        return axios.create({
            baseURL: packageConfig.configuration.APITrainings,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    authenticationAxios() { 
        let a = axios.create({
            baseURL: packageConfig.configuration.PortalGateWayAPI,
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                Accept: 'application/json',
                ContentType: 'application/json'
            }
        });
        a.interceptors.response.use((response) => { 
            return response;
        }, error => {
            console.log('error')
            if (error.response?.status === 401) {
                window.location = packageConfig.configuration.BaseFolderName + "/unauthorized";
            }
            return Promise.reject(error);
        });
        axiosRetry(a, {  retries: 10,retryDelay: (retryCount) => {
            return retryCount * 1000;
        }});
        return a;
    }

}

export default new interceptor()