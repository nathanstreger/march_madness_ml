import axios from 'axios'
import { Endpoints } from './Constants'

export const SayHelloRequest = async (): Promise<string> => {
    try {
        const response = await axios.get(Endpoints.HelloWorld)
        return response.data
    } 
    catch (error) {
        console.error(error)
        return ''
    }
}