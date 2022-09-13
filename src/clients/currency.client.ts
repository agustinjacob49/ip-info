import axios from 'axios';

/*
    Api Calls to Currency API
*/
export class CurrencyClient {
    async getCurrencyData(currency: string): Promise<any> {


        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.get<any>(
              `https://api.apilayer.com/fixer/latest?symbols=USD&base=${currency}`,
              {
                headers: {
                  Accept: 'application/json',
                  apikey: 'c6d2yYeqSg6QGTSasAxQ9QdYNjdch1VC'
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
        /*
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                    "base": 'USD',
                    "date": "2018-02-13",
                    "rates": {
                       "CAD": 1.260046,
                       "CHF": 0.933058,
                       "EUR": 0.806942,
                       "GBP": 0.719154,
                    }
            });
            }, 1500);
          });
          */
    }
}