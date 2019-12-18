import axios from 'axios'


export const getImages = async (page?: number) => {
    const response = await axios.get(`images?page=${page}`)
    return response.data
}

export const getImageById = async (id: string) => {
    const response = await axios.get(`images/${id}`)
    return response.data
}