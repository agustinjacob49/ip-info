import { route, GET } from 'awilix-express';
import { Request, Response } from 'express';
import { IPInfoService } from '../services/ipInfo.service';


@route('/statistics')
export class StatisticsController {
    constructor(private readonly ipInfoService: IPInfoService) {

    }

    @GET()
    public stats(req: Request, res: Response): void {

        this.ipInfoService.getStatistics().then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }
}