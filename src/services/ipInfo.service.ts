import { PersistanceService } from './persistance.service';
import { CurrencyService } from './currency.service';
import { GeolocationService } from './geolocation.service';
import { Country } from './repositories/domain/country';
import { ResponseStatisticsDTO, ResponseCalculateDTO } from '../dtos/responses.dto';
import { GeoLocationDTO } from '../dtos/Geolocation.dto';
import { CurrencyDTO } from '../dtos/Currency.dto';
/*
    Manage the methods of geolocation - > 
        * Add 1 to the amount of request
        * Get currency data
        * Transform response.
*/
export class IPInfoService {
    constructor(private readonly geolocationService: GeolocationService, private readonly currencyService: CurrencyService, private readonly persistanceService: PersistanceService){

    }

    async calculate(ip: string): Promise<ResponseCalculateDTO> {
        
        try{
            //Call to geolocationservice
            const geoLocationData: GeoLocationDTO = await this.geolocationService.getGeoLocationData(ip);

            const { currency, code, distance_to_usa: distance, name } = geoLocationData;

            //Call Currency service
            const currencyData: Array<CurrencyDTO> = await this.currencyService.getCurrencyData(currency);

            //Update statistics
            await this.persistanceService.updateStatistics(code, distance, name);

            return {
                ...geoLocationData,
                currencies : currencyData,
            };
        } catch(err) {
            console.log(err);
            throw(err);
        }
    }

    async getStatistics() : Promise<ResponseStatisticsDTO> {
        try{
            //Update statistics
            const mostRequestCountry: Country | undefined = await this.persistanceService.getMostRequestedCountry();
            const highestDistanceCountry: Country | undefined = await this.persistanceService.getLongestDistanceCountry();

            if (mostRequestCountry && highestDistanceCountry){
                const { name: nameRequested, reqAmount: req_amountRequested } = mostRequestCountry;
                const { name: nameDistance, longestDistance: distance_amountDistance } = highestDistanceCountry;
                
                return {
                    longest_distance: {
                        country: nameDistance,
                        value: distance_amountDistance 
                    },
                    most_traced: {
                        country: nameRequested, 
                        value: req_amountRequested.toString(),
                    }
                };
            } else {
                throw new Error('Cant find elements - Please check DB access or maybe its empty');
            }
           
        } catch(err) {
            console.log(err);
            throw(err);
        }
    }
}