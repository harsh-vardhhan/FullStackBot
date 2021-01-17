import axios from 'axios';

const LOCALHOST = 'http://127.0.0.1:8000/';
const defaultAxiosOptions = {
  baseURL: LOCALHOST
};
export const fetch = axios.create(defaultAxiosOptions);

export const getJob = async () => {
  const response  = await fetch.get('getjob/')
  return response.data;
}