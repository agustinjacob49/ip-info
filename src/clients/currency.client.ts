import axios from 'axios';

/*
    Api Calls to Currency API
*/
export class CurrencyClient {
    async getCurrencyData(currency: string): Promise<any> {


        try {
            const { data, status } = await axios.get<any>(
              `https://api.apilayer.com/fixer/latest?symbols=USD&base=${currency}`,
              {
                headers: {
                  Accept: 'application/json',
                  apikey: process.env.API_CURRENCY_KEY as string,
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