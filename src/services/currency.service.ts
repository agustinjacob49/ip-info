import { CurrencyClient } from '../clients/currency.client';
import getSymbolFromCurrency from 'currency-symbol-map'
import { $, USD } from '../common/constants';
import { CurrencyDTO } from '../dtos/Currency.dto';

/*
    Method who manage comunication and transform data with currency client
*/
export class CurrencyService {
    constructor(private readonly currencyClient: CurrencyClient) {

    }

    async getCurrencyData(currency: string): Promise<Array<CurrencyDTO>> {
        const { base, rates: { USD: usdRate } } = await this.currencyClient.getCurrencyData(currency);
        const symbol = getSymbolFromCurrency(base);
        const currencies = [
            {
                iso: USD,
                symbol: $,
                conversion_rate: 1
            } as CurrencyDTO,
            {
                iso: base,
                symbol,
                conversion_rate: new Number(usdRate.toFixed(2))
            } as CurrencyDTO
        ];

        return currencies;
    }
}