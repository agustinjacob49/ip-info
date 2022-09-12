import { route, GET } from 'awilix-express';
import { Request, Response } from 'express';


@route('/traces')
export class IpInfoController {

    @GET()
    public index(req: Request, res: Response): void {
        res.send({
            "ip": "190.191.237.90",
            "name": "Argentina",
            "code": "AR",
            "lat": -34.6022,
            "lon": -58.3845,
            "currencies": [
                {
                    "iso": "ARS",
                    "symbol": "$",
                    "conversion_rate": 0.023
                },
                {
                    "iso": "USD",
                    "symbol": "$",
                    "conversion_rate": 1
                }
            ],
            "distance_to_usa": 8395.28
        })
    }
}