import axios from 'axios';
import { FIELDS } from '../common/constants';
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 2 * 60 * 1000
});

const request = axios.create({
  adapter: cache.adapter
});

/*
    Api Calls to IP API
*/

const ipURI = 'http://ip-api.com/json/';
export class GeoLocationAPIClient {
  async getGeoLocation(ip: string): Promise<any> {
    try {
      const { data } = await request.get<any>(
        `${ipURI}${ip}?fields=${FIELDS}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return data;
    } catch (err: any) {
      const { data } = err;
      const { message } = data || {};
      const errorMessage = message || err.message || 'undefined error';
      throw new Error(`Something went wrong at GeoLocationAPIClient - getGeoLocation - ${errorMessage}`);
    }
  }
}