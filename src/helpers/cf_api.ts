import axios, { AxiosInstance } from 'axios';
import { IRegisterModel } from '../models';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { CONFIG } from '../firebase-config';

class CloudFunctionsApi {
  private handler: AxiosInstance;
  constructor() {
    this.handler = axios.create({
      baseURL: CONFIG.API_URL,
    });

    this.handler.interceptors.request.use(async config =>  {
      const token = await firebase.auth().currentUser.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    this.handler.interceptors.response.use(res => res.data, error => Promise.reject(error));
  }

  public async registerUser(data: IRegisterModel) {
    return await this.handler.post('/auth/register', data);
  }

  public async getUsers() {
    return  await this.handler.get('/auth/users');
  }

  public async setUserCustomClaims(userId: string, claims: any) {
    return await this.handler.post(`/auth/users/${userId}/custom-claims`, claims);
  }

  public async enterTicketDraw(eventId: string) {
    return await this.handler.post('/events/enter-draw', {eventId});
  }
  public async getCities() {
    return await this.handler.get('/events/cities');
  }
}

export const CFAPI = new CloudFunctionsApi();
