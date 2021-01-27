import axios from 'axios';

const LOCALHOST = 'http://127.0.0.1:8000/';
const SERVER = 'https://fullstackbot-backend.onrender.com/';

const defaultAxiosOptions = {
    baseURL: SERVER
};

export const fetch = axios.create(defaultAxiosOptions);

export const getJob = async () => {
    const response = await fetch.get('getjob/');
    return response.data;
};

export const getTag = async () => {
    const response = await fetch.get('gettag/');
    return response.data;
};

export const filterTag = async (body) => {
    const response = await fetch.post('filtertag/', body);
    return response.data;
};

export const adminLogin = async (body) => {
    const response = await fetch.post('adminlogin/', body);
    return response.data;
};

export const editJob = async (body) => {
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    const response = await fetch.put('editjob/', body, {headers});
    return response.data;
};

export const addJob = async (body) => {
    const headers = {
        Authorization: 'Token ' + localStorage.getItem('token')
    };
    const response = await fetch.post('addjob/', body, {headers});
    return response.data;
};
