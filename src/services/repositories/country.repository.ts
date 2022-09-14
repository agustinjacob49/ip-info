import { Country } from './domain/country';
export interface ICountryRepository {
    getByCode(code: string): Promise<Country | null>;
    getAll(): Promise<Array<Country>>;
    saveData(countryData: Country): Promise<boolean>;
}