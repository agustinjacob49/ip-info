import { PersistanceService } from './persistance.service';
import { CurrencyService } from './currency.service';
import { GeolocationService } from './geolocation.service';
/*
    Manage the methods of geolocation - > 
        * Add 1 to the amount of request
        * Get currency data
        * Transform response.
*/
export class IPInfoService {
    constructor(private readonly geolocationService: GeolocationService, private readonly currencyService: CurrencyService, private readonly persistanceService: PersistanceService){

    }

    async calculate(ip: string): Promise<any> {
        
        try{
            //Call to geolocationservice
            const geoLocationData = await this.geolocationService.getGeoLocationData(ip);

            const { currency } = geoLocationData;

            //Call Currency service
            const currencyData = await this.currencyService.getCurrencyData(currency);

            //Update statistics
            await this.persistanceService.save(geoLocationData);

            return {
                ...geoLocationData,
                ...currencyData
            };
        } catch(err) {
            console.log(err);
        }
    }


    transform(): any {
        return {};
    }
}