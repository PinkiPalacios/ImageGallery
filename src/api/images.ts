import axios from 'axios'


export const getImages = async () => {
    const response = await axios.get('images')
    return response.data
}