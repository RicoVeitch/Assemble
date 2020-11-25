import axios, { AxiosResponse } from 'axios';
import { IQuestion } from '../models/question';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
    // postForm: (url: string, file: Blob) => {
    //   let formData = new FormData();
    //   formData.append('File', file);
    //   return axios.post(url, formData, {
    //       headers: {'Content-type': 'multipart/form-data'}
    //   }).then(responseBody)
  // } 
};

const Questions = {
  list: (): Promise<IQuestion[]> => requests.get('/Questions'),
  create: (question: IQuestion) => requests.post('/Questions', question),
  edit: (question: IQuestion) => requests.put(`/Questions/${question.id}`, question),
  delete: (question: IQuestion) => requests.del(`/Questions/${question.id}`)
}

export default {
  Questions,
};