import axios from 'axios';
import { USD } from '../common/constants';

/*
    Api Calls to Currency API
*/

const apiLayerURI = 'https://api.apilayer.com/fixer/latest';
export class CurrencyClient {
  async getCurrencyData(currency: string): Promise<any> {
    try {
      const { data } = await axios.get<any>(
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