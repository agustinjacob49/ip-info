import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { IpInfoController } from './controllers/ipInfo.controller';
import { CurrencyService } from './services/currency.service';
import { GeolocationService } from './services/geolocation.service';
import express from 'express';


export default(app: express.Application ) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        geolocationService : asClass(GeolocationService).scoped(),
        ipInfoController: asClass(IpInfoController).scoped(),
        currencyService: asClass(CurrencyService).scoped(),
    });

    app.use(scopePerRequest(container));
}