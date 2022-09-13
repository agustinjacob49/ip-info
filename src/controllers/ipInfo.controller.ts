import { route, POST } from 'awilix-express';
import { Request, Response } from 'express';
import { RequestPayloadDTO } from '../common/Request.dto';
import { IPInfoService } from '../services/ipInfo.service';


@route('/traces')
export class IpInfoController {
    constructor(private readonly ipInfoService: IPInfoService) {

    }

    @POST()
    public trace(req: Request, res: Response): void {
        const { body } = req;
        const { ip } = body as RequestPayloadDTO;
        this.ipInfoService.calculate(ip).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        })
    }
}