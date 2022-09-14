import mockAxios from 'jest-mock-axios';
import { GeoLocationAPIClient } from '../../../clients/ipApi.client';
import { FIELDS } from '../../../common/constants';
import { GeolocationService } from '../../../services/geolocation.service';

const geoLocationServiceMock = new GeolocationService(new GeoLocationAPIClient());
describe('Geolocation service test', () => {
    jest.setTimeout(9000000);

    afterEach(() => {
        // cleaning up the mess left behind the previous test
        mockAxios.reset();
    });

    test('get ipInfo  - api return 200', () => {

        const promise = geoLocationServiceMock.getGeoLocationData('192.168.0.1');

        expect(mockAxios.get).toHaveBeenCalledWith(`http://ip-api.com/json/192.168.0.1?fields=${FIELDS}`, { headers: { "Accept": "application/json" } });

        // simulating a server response
        const responseObj = {
            data: {
                "status": "success",
                "country": "Canada",
                "countryCode": "CA",
                "lat": 45.6085,
                "lon": -73.5493,
                "currency": "CAD"
              
            }
        };
        mockAxios.mockResponse(responseObj);

        return promise.then((res) => {
            const {ip, name, code, lat, lon, distance_to_usa} = res;
            expect(ip).toBe('192.168.0.1');
            expect(name).toBe('Canada');
            expect(code).toBe('CA');
            expect(lat).toBe(45.6085);
            expect(lon).toBe(-73.5493);
            expect(distance_to_usa.toString()).toBe('293.15');
        });
    });

    test('get ipInfo  - api fails', () => {

        const promise = geoLocationServiceMock.getGeoLocationData('192.168.0.1');

        expect(mockAxios.get).toHaveBeenCalledWith(`http://ip-api.com/json/192.168.0.1?fields=${FIELDS}`, { headers: { "Accept": "application/json" } });

        const rejectObj = {
            data: {
                message: 'Error'
            }
        };
        mockAxios.mockError(rejectObj);

        return promise.catch((err: any) => {
            const { message } = err;
            expect(message).toBe('Something went wrong at GeoLocationAPIClient - getGeoLocation - Error');
        })
    });
});