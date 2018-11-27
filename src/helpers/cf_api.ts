import axios, { AxiosInstance } from 'axios';
import { IRegisterModel } from 'src/models';

class CloudFunctionsApi {
  private handler: AxiosInstance;
  constructor() {
    this.handler = axios.create({
      baseURL: 'https://us-central1-tomahawk-da413.cloudfunctions.net'
    });
  }

  public async registerUser(data: IRegisterModel) {
    return await this.handler.post('/auth/register', data);
  }
}

export const CFAPI = new CloudFunctionsApi();
