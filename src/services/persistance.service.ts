import { CountryRepository } from './repositories/impl/country.repository';

/*
    Manage the comunication with the db layer 
*/
export class PersistanceService {
    constructor(private readonly countryRepository: CountryRepository) {

    }

    async updateStatistics(code: string, distanceActual: number, name: string): Promise<any> {
        // Get actual country
        const { Item: item } = await this.countryRepository.getByCode(code);
        let newItem = { ...item };
        if (item) {
            const { longest_distance_req: { N: distanceSaved }, req_amount : { N: amountReq} } = item;
            const distanceToSave = parseFloat(distanceSaved) < distanceActual ? distanceActual : distanceSaved;
            const amountReqToSave = parseInt(amountReq) + 1;

            newItem = {
                ...newItem,
                longest_distance_req: {N: distanceToSave.toString()},
                req_amount: {N: amountReqToSave.toString()},
            }
        } else {
            newItem = {
                code : { S: code },
                longest_distance_req: {N: distanceActual.toString()},
                req_amount: {N: '1'.toString()},
                name: { S : name}
            }
        }

        return this.countryRepository.saveData(newItem);
    }


    async get(code: string): Promise<any> {
        //FOO implement
        return await this.countryRepository.getByCode(code);
    }

    async getMostRequestedCountry(code: string): Promise<any> {
        //FOO implement
        return await this.countryRepository.getByCode(code);
    }
}
