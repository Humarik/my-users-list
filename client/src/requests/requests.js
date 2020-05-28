import openSocket from 'socket.io-client'

class Requests {
    async getRequest(url) {
        try {
            const response = await fetch(url);
            return await response.json()
        } catch (error) {
            console.log(error);
        } 
    }

    connectionSocket(url) {
        return openSocket(url);
    }

    async postRequest(url, body) {
        return await fetch(url, body);
    }
}

export default Requests;