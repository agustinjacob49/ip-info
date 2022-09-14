import mockAxios from 'jest-mock-axios';
import { CurrencyService } from '../../../services/currency.service';
import { CurrencyClient } from '../../../clients/currency.client';

const currencyServiceMock = new CurrencyService(new CurrencyClient());
describe('Currency service test', () => {
    jest.setTimeout(9000000);

    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset();
    });

    test('get currency  - api return 200', () => {

        const promise = currencyServiceMock.getCurrencyData('USD');

        expect(mockAxios.get).toHaveBeenCalledWith('https://api.apilayer.com/fixer/latest?symbols=USD&base=USD', { headers: { "Accept": "application/json", "apikey": undefined } });

        // simulating a server response
        const responseObj = {
            data: {
                "base": "ARS",
                "date": "2022-09-14",
                "rates": {
                    "USD": 0.006999
                },
                "success": true,
                "timestamp": 1663166584
            }
        };
        mockAxios.mockResponse(responseObj);

        return promise.then((res) => {
            expect(res).toHaveLength(2);
            const [usd, ars] = res;
            const { conversion_rate, iso, symbol} = usd;
            expect(conversion_rate).toBe(1);
            expect(iso).toBe('USD');
            expect(symbol).toBe('$');

            const { conversion_rate: convArs, iso: isoArs, symbol: symbolArs} = ars;
            expect(convArs.toString()).toBe('0.01');
            expect(isoArs).toBe('ARS');
            expect(symbolArs).toBe('$');
        });
    });

    test('get currency  - api fails', () => {

        const promise = currencyServiceMock.getCurrencyData('USD');

        expect(mockAxios.get).toHaveBeenCalledWith('https://api.apilayer.com/fixer/latest?symbols=USD&base=USD', { headers: { "Accept": "application/json", "apikey": undefined } });

        const rejectObj = {
            data: {
                message: 'Error'
            }
        };
        mockAxios.mockError(rejectObj);

        return promise.then((res) => {
            expect(res).toHaveLength(2);
            const [usd, ars] = res;
            const { conversion_rate, iso, symbol} = usd;
            expect(conversion_rate).toBe(1);
            expect(iso).toBe('USD');
            expect(symbol).toBe('$');

            const { conversion_rate: convArs, iso: isoArs, symbol: symbolArs} = ars;
            expect(convArs).toBe(0.01);
            expect(isoArs).toBe('ARS');
            expect(symbolArs).toBe('$');
        }).catch((err) => {
            const { message } = err;
            expect(message).toBe('Something went wrong at CurrencyClient - getCurrencyData - Error');
        })
    });
});