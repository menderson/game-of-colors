import axios from 'axios';

const api = axios.create({
    baseURL: 'https://game-of-colors-menderson.herokuapp.com/'
});

export default api;