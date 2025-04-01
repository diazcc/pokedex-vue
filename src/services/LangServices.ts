// LangServices.ts
import axios from 'axios';
const axios_instance = axios.create()

const LangServices = {
   
    async getLangEsCo() {
        return axios_instance.get('/es_CO.json')
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error.response.data;
            });
    },

    async getLangEnUs() {
        return axios_instance.get('/en_US.json')
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw error.response.data;
            });
    },

};

export default LangServices;