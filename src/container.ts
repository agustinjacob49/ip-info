import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { CurrencyService } from './services/currency.service';
import { GeolocationService } from './services/geolocation.service';
import express from 'express';
import { PersistanceService } from './services/persistance.service';
import { IPInfoService } from './services/ipInfo.service';
import { GeoLocationAPIClient } from './clients/ipApi.client';
import { CurrencyClient } from './clients/currency.client';
import { CountryRepository } from './services/repositories/impl/country.repository';


export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        geolocationService: asClass(GeolocationService).scoped(),
        currencyService: asClass(CurrencyService).scoped(),
        persistanceService: asClass(PersistanceService).scoped(),
        ipInfoService: asClass(IPInfoService).scoped(),
        ipApiClient: asClass(GeoLocationAPIClient).scoped(),
        currencyClient: asClass(CurrencyClient).scoped(),
        countryRepository: asClass(CountryRepository).scoped()
    });

    app.use(scopePerRequest(container));
}