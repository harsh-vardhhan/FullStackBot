import axios from 'axios';

const LOCALHOST = 'https://fullstackbot-backend.onrender.com/';
const defaultAxiosOptions = {
  baseURL: LOCALHOST
};
export const fetch = axios.create(defaultAxiosOptions);

export const getJob = async () => {
  const response  = await fetch.get('getjob/')
  return response.data;
}