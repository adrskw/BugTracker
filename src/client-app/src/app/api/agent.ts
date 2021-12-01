import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Ticket } from '../models/ticket';
import { User, UserLoginFormValues } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;

  if (token)
    config.headers!.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(async response => {
  return response;
},
  (error: AxiosError) => {
    const { data, status, config } = error.response!;

    switch (status) {
      case 400:
        if (typeof data === 'string')
          toast.error(data);

        if (config.method === 'get' && data.errors.hasOwnProperty('id'))
          history.push('/notFound')

        if (data.errors) {
          const modalStateErrors = [];

          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        history.push('/');
        toast.error('Unauthorized');
        break;
      case 404:
        history.push('/notFound')
        break;
      case 500:
        history.push('/serverError')
        break;
    }

    return Promise.reject(error);
  });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Tickets = {
  list: () => requests.get<Ticket[]>('/tickets'),
  details: (id: string) => requests.get<Ticket>(`/tickets/${id}`),
  create: (ticket: Ticket) => requests.post<void>('/tickets', ticket),
  update: (ticket: Ticket) => requests.put<void>(`/tickets/${ticket.id}`, ticket),
  delete: (id: string) => requests.delete<void>(`/tickets/${id}`)
}

const Account = {
  current: () => requests.get<User>('/account'),
  login: (loginFormValues: UserLoginFormValues) => requests.post<User>('/account/login', loginFormValues)
}

const agent = {
  Tickets,
  Account
}

export default agent;