import { CountryRepository } from './repositories/impl/country.repository';

/*
    Manage the comunication with the db layer 
*/
export class PersistanceService {
    constructor(private readonly countryRepository: CountryRepository){

    }

    async save(code: string): Promise<any> {
        //FOO implement
        return await this.countryRepository.saveData(code);
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
