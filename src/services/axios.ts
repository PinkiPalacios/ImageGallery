import axios from 'axios'

export const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
export const API_ENDPOINT = 'http://195.39.233.28:8035'

function init() {
    axios.defaults.baseURL = API_ENDPOINT


    axios.interceptors.request.use(async (config) => {
        console.log('Request', config.method, config.url, config)

        return config
    }, (err) => {
        console.log('Request error', err)
    }
    )

    axios.interceptors.response.use((response) => {
        console.log('Response', response)
        return response
    }, (err) => {
        return Promise.reject(err)
    })
}

export const axiosService = {
    init
}