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