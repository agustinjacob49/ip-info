import { CountryRepository } from "./repositories/impl/country.repository";

/*
    Manage the comunication with the db layer 
*/
export class PersistanceService {

    save(data: any): any {
        //FOO implement
        const a = new CountryRepository().saveData(data);
    }


    get(code: string): any {
        //FOO implement
        const a = new CountryRepository().getByCode(code);
        return {
            "isp": "Telecom Argentina S.A",
            "org": "Fibertel",
            "as": "AS7303 Telecom Argentina S.A.",
            "asname": "Telecom Argentina S.A.",
        };
    }
}
