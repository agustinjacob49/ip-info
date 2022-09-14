import { LONG_NY, LAT_NY } from '../common/constants';
import { getDistanceTwoPoints } from '../common/utils';
import { IPApiClient } from '../clients/ipApi.client';
import { GeoLocationDTO } from '../dtos/Geolocation.dto';

/*
    Manage the methods of geolocation - > 
        * Calculate distance to united states
        * Return simplified data from the API INFO Client
*/
export class GeolocationService {
    constructor(private readonly ipApiClient: IPApiClient) {

    }

    async getGeoLocationData(ip: string): Promise<GeoLocationDTO> {
        const geoLocationData = await this.ipApiClient.getGeoLocation(ip);
        const { country, countryCode, lat, lon, currency } = geoLocationData;

        const distance = getDistanceTwoPoints(LAT_NY, LONG_NY, lat, lon, 'N');

        return {
            ip,
            name: country,
            code: countryCode,
            currency: currency,
            distance_to_usa: new Number(distance.toFixed(2)) as number,
            lat,
            lon,
        }
    }
}