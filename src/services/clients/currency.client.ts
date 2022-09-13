/*
    Api Calls to Currency API
*/
export class CurrencyClient {
    async getCurrencyData(currency: string): Promise<any> {
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
    }
}