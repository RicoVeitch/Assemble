import axios, { AxiosResponse } from 'axios';
import { IQuestion } from '../models/question';
import {history} from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(undefined, error => {
  const {status} = error.response;
  console.log(error.response);
  switch(status) {
    case 404:
      console.log("caught");
      history.push('/notfound');
      toast.error("Question not found");
      break;
  }
  throw error.response;
  // console.log(error.response);
})

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
  delete: (id: string) => requests.del(`/Questions/${id}`),
  details: (id: string) => requests.get(`/Questions/${id}`)
}

export default {
  Questions,
};