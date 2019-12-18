import axios from 'axios'
export const auth = async () => {
    const response = await axios.post('auth', {
        apiKey: '760b5fb497225856222a'
    })
    return response.data.token
}