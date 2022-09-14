import { CountryRepository } from './repositories/impl/country.repository';
import { Country } from './repositories/domain/country';

/*
    Manage the comunication with the db layer 
*/
export class PersistanceService {
    constructor(private readonly countryRepository: CountryRepository) {

    }

    async updateStatistics(code: string, distanceActual: number, name: string): Promise<boolean> {
        // Get actual country
        const country: Country | null = await this.countryRepository.getByCode(code);
        let distanceToSave = distanceActual;
        let amountReqToSave = 1;
        if (country) {
            const { longestDistance: distanceSaved, reqAmount: reqAmountSaved } = country;

            distanceToSave = distanceSaved < distanceActual ? distanceActual : distanceSaved;
            amountReqToSave = reqAmountSaved;
            amountReqToSave++
        }

        const countryToSave: Country = {
            code,
            name,
            longestDistance: distanceToSave,
            reqAmount: amountReqToSave
        }

        return this.countryRepository.saveData(countryToSave);
    }

    async getMostRequestedCountry(): Promise<Country | undefined> {
        const items = await this.countryRepository.getAll() as Array<Country>;
        const arrayNew = [...items];

        arrayNew.sort(function (a: Country, b: Country) {
            const { reqAmount: reqAmountA } = a;
            const { reqAmount: reqAmountB } = b;

            return reqAmountA - reqAmountB;
        });

        const result: Country | undefined = arrayNew.pop();
        return result;
    }

    async getLongestDistanceCountry(): Promise<Country | undefined> {
        const items = await this.countryRepository.getAll() as Array<Country>;
        const arrayNew = [...items];

        arrayNew.sort(function (a: Country, b: Country) {
            const { longestDistance: longestDistanceA } = a;
            const { longestDistance: longestDistanceB } = b;

            return longestDistanceA - longestDistanceB;
        });
        const result: Country | undefined = arrayNew.pop();
        return result;
    }
}
