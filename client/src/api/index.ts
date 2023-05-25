import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL
export async function getSingleRoom(id: string) {
    return await axios.get(`${apiUrl}/rooms/${id}`)
}

export async function createRoom(data: any) {
    return await axios.post(`${apiUrl}/rooms`, data)
}

export async function updateCode(id: string, data: any) {
    return await axios.put(`${apiUrl}/rooms/${id}`, data)
}
