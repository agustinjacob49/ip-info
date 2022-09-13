import axios from 'axios';
import { FIELDS } from '../common/constants';
/*
    Api Calls to IP API
*/

const ipURI = 'http://ip-api.com/json/';
export class IPApiClient {
  async getGeoLocation(ip: string): Promise<any> {
    try {
      const { data, status } = await axios.get<any>(
        `${ipURI}${ip}?fields=${FIELDS}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
}