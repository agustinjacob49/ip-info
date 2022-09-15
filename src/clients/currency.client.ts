import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 25 * 60 * 1000
});

const request = axios.create({
  adapter: cache.adapter
});

import { USD } from '../common/constants';

/*
    Api Calls to Currency API
*/

const apiLayerURI = 'https://api.apilayer.com/fixer/latest';
export class CurrencyClient {
  async getCurrencyData(currency: string): Promise<any> {
    try {
      const { data } = await request.get<any>(
        `${apiLayerURI}?symbols=${USD}&base=${currency}`,
        {
          headers: {
            Accept: 'application/json',
            apikey: process.env.API_CURRENCY_KEY as string,
          },
        },
      );
      
      return data;
    } catch (err: any) {
      const { data } = err;
      const { message } = data || {};
      const errorMessage = message || err.message || 'undefined error';
      throw new Error(`Something went wrong at CurrencyClient - getCurrencyData - ${errorMessage}`);
    }
  }
}