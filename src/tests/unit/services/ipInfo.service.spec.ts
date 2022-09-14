import { GeoLocationAPIClient } from '../../../clients/ipApi.client';
import { GeolocationService } from '../../../services/geolocation.service';
import { IPInfoService } from '../../../services/ipInfo.service';
import { CurrencyService } from '../../../services/currency.service';
import { CurrencyClient } from '../../../clients/currency.client';
import { PersistanceService } from '../../../services/persistance.service';
import { CountryRepository } from '../../../services/repositories/impl/mock/country.mock.repository';

const geoLocation = new GeolocationService(new GeoLocationAPIClient());


const currencyService = new CurrencyService(new CurrencyClient());

const persistanceService = new PersistanceService(new CountryRepository());

const ipInfoService = new IPInfoService(geoLocation, currencyService, persistanceService);
describe('IP Info service test', () => {

    jest.setTimeout(9000000);

    beforeEach(() => {
        // cleaning up the mess left behind the previous test
        jest.clearAllMocks();
        jest.restoreAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
    });

    test('IP Info service - Calculate works well', () => {

        geoLocation.getGeoLocationData = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    ip: '192.168.0.1',
                    name: 'Argentina',
                    code: 'AR',
                    currency: 'ARS',
                    distance_to_usa: 1945,
                    lat: 14,
                    lon: -14,
                });
            });
        });

        currencyService.getCurrencyData = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve(
                    [
                        {
                            iso: 'USD',
                            symbol: '$',
                            conversion_rate: 1
                        },
                        {
                            iso: 'ARS',
                            symbol: '$',
                            conversion_rate: 0.01
                        }

                    ]
                );
            });
        });

        const promise = ipInfoService.calculate('192.168.0.1');

        return promise.then((resp) => {
            const { ip, name, code, lat, lon, distance_to_usa } = resp;
            expect(ip).toBe('192.168.0.1');
            expect(name).toBe('Argentina');
            expect(code).toBe('AR');
            expect(lat).toBe(14);
            expect(lon).toBe(-14);
            expect(distance_to_usa.toString()).toBe('1945');
        });
    });


    test('IP Info service - Statistics twice fails', () => {

        persistanceService.getLongestDistanceCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                reject({ message: 'error' });
            });
        });
        persistanceService.getMostRequestedCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                reject({ message: 'error' });
            });
        });

        const promise = ipInfoService.getStatistics();

        return promise.then((resp) => {
            expect(true).toBeFalsy();
        }).catch((err) => {
            const { message } = err;
            expect(message).toEqual('error');
        });
    });


    test('IP Info service - Statistics getMostRequestedCountry fails', () => {

        persistanceService.getLongestDistanceCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({ code: 'AR', longestDistance: 123, reqAmount: 1, name: 'Argentina' });
            });
        });

        persistanceService.getMostRequestedCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                reject({ message: 'error' });
            });
        });

        const promise = ipInfoService.getStatistics();

        return promise.then((resp) => {
            expect(true).toBeFalsy();
        }).catch((err) => {
            const { message } = err;
            expect(message).toEqual('error');
        });
    });

    test('IP Info service - Statistics getMostRequestedCountry well', () => {

        persistanceService.getLongestDistanceCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({ code: 'AR', longestDistance: 123090, reqAmount: 1, name: 'Argentina' });
            });
        });

        persistanceService.getMostRequestedCountry = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({ code: 'US', longestDistance: 1232, reqAmount: 1123, name: 'United States' });
            });
        });

        const promise = ipInfoService.getStatistics();

        return promise.then((resp) => {
            const { longest_distance, most_traced } = resp;
            const { country: countryL, value: valueL } = longest_distance;
            const { country: countryR, value: valueR } = most_traced;

            expect(countryL).toBe('Argentina');
            expect(valueL).toBe(123090);

            expect(countryR).toBe('United States');
            expect(valueR).toBe('1123');
        }).catch((err) => {
            expect(true).toBeFalsy();
        });
    });

});