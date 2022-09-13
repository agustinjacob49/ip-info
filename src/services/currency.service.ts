import { CurrencyClient } from './clients/currency.client';
/*
    Method who manage comunication and transform data with currency client
*/

export class CurrencyService {
    constructor(private readonly currencyClient: CurrencyClient){

    }

    getCurrencyData(currency: string): any {
        return this.currencyClient.getCurrencyData(currency);
    }
}