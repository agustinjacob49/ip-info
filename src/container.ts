import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { IpInfoController } from './controllers/ipInfo.controller';
import { CurrencyService } from './services/currency.service';
import { GeolocationService } from './services/geolocation.service';
import express from 'express';
import { PersistanceService } from './services/persistance.service';
import { IPInfoService } from './services/ipInfo.service';


export default(app: express.Application ) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        geolocationService : asClass(GeolocationService).scoped(),
        currencyService: asClass(CurrencyService).scoped(),
        persistanceService: asClass(PersistanceService).scoped(),
        iPInfoService: asClass(IPInfoService).scoped(),
    });

    app.use(scopePerRequest(container));
}