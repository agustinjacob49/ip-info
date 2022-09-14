import axios from 'axios';
import { FIELDS } from '../common/constants';
/*
    Api Calls to IP API
*/

const ipURI = 'http://ip-api.com/json/';
export class IPApiClient {
  async getGeoLocation(ip: string): Promise<any> {
    try {
      const { data } = await axios.get<any>(
        `${ipURI}${ip}?fields=${FIELDS}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        throw error;
      } else {
        console.log('unexpected error: ', error);
        throw error;
      }
    }
  }
}