import { route, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { isInvalidIPaddress } from '../common/utils';
import { RequestPayloadDTO } from '../dtos/Request.dto';
import { IPInfoService } from '../services/ipInfo.service';


@route('/traces')
export class IpInfoController {
    constructor(private readonly ipInfoService: IPInfoService) {

    }

    @POST()
    public trace(req: Request, res: Response): void {
        const { body } = req;
        const { ip } = body as RequestPayloadDTO;

        if(isInvalidIPaddress(ip)){
            res.status(400);
            res.send({error: 'You need to send an ip address in valid format'});
            console.log(`Invalid IP Address - ${ip}`);
            return;
        }

        this.ipInfoService.calculate(ip).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({ error: 'Something went wrong'});
        })
    }
}