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

            const { currency, code, distance_to_usa: distance, name } = geoLocationData;

            //Call Currency service
            const currencyData = await this.currencyService.getCurrencyData(currency);

            //Update statistics
            await this.persistanceService.updateStatistics(code, distance, name);

            return {
                ...geoLocationData,
                currencies : currencyData,
            };
        } catch(err) {
            console.log(err);
        }
    }

    async getStatistics(){
        try{
            //Update statistics
            const mostRequestCountry = await this.persistanceService.getMostRequestedCountry();
            const highestDistanceCountry = await this.persistanceService.getLongestDistanceCountry();
            const { name: { S : nameRequested }, req_amount: { N: req_amountRequested }} = mostRequestCountry;
            const { name: { S : nameDistance }, longest_distance_req: { N: distance_amountDistance }} = highestDistanceCountry;
            
            return {
                "longest_distance": {
                    "country": nameDistance,
                    "value": distance_amountDistance 
                },
                "most_traced": {
                    "country": nameRequested, 
                    "value": req_amountRequested,
                } 
            };
        } catch(err) {
            console.log(err);
        }
    }
}