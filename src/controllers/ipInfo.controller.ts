import { route, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { GeolocationService } from '../services/geolocation.service';
import { RequestPayloadDTO } from '../common/Request.dto';


@route('/traces')
export class IpInfoController {
    constructor(private readonly geolocationService: GeolocationService){

    }

    @POST()
    public trace(req: Request, res: Response): void {
        const { body } = req;
        const { ip } = body as RequestPayloadDTO;
        res.send(this.geolocationService.getGeoLocationData(ip));
    }
}