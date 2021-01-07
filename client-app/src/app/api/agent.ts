import axios, { AxiosResponse } from 'axios';
import { IQuestion } from '../models/question';
import {history} from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { IAnswer } from '../models/answer';
import { ICategory } from '../models/category';
import { IAnswerReply } from '../models/answerReply';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  // console.log(config);
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
})

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
};

const Questions = {
  list: (params: URLSearchParams): Promise<IQuestion[]> => axios.get('/Questions', {params: params}).then(responseBody),
  listDisliked: (): Promise<string[]> => requests.get('/Questions/disliked'),
  listLiked: (): Promise<string[]> => requests.get('/Questions/liked'),
  create: (question: IQuestion) => requests.post('/Questions', question),
  edit: (question: IQuestion) => requests.put(`/Questions/${question.id}`, question),
  delete: (id: string) => requests.del(`/Questions/${id}`),
  details: (id: string) => requests.get(`/Questions/${id}`),
  like : (id: string) => requests.put(`/Questions/like/${id}`, {}),
  dislike : (id: string) => requests.put(`/Questions/dislike/${id}`, {})
}

const Answers = {
  listDisliked: (): Promise<string[]> => requests.get('/Answer/disliked'),
  listLiked: (): Promise<string[]> => requests.get('/Answer/liked'),
  create: (answer: IAnswer) => requests.post('/Answer', answer),
  edit: (id: string, answer: any) => requests.put(`/Answer/${id}`, answer),
  delete: (id: string) => requests.del(`/Answer/${id}`),
  like : (id: string) => requests.put(`/Answer/like/${id}`, {}),
  dislike : (id: string) => requests.put(`/Answer/dislike/${id}`, {})
}

const AnswerReplies = {
  create : (reply: IAnswerReply) => requests.post('/AnswerReply', reply),
  edit : (reply: IAnswerReply) => requests.put(`/AnswerReply/${reply.id}`, reply),
  delete : (replyId: string) => requests.del(`/AnswerReply/${replyId}`)
}

const Users = {
  login: (user: IUserFormValues): Promise<IUser> =>  requests.post('/User/login', user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post('/User/register', user),
  getCurrentUser: () : Promise<IUser> => requests.get('/User')
}

const Categories = {
  list: (): Promise<ICategory> => requests.get('/Category')
}

export default {
  Questions,
  Users,
  Answers,
  Categories,
  AnswerReplies
};