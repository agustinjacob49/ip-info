import { CurrencyDTO } from './Currency.dto';

export interface LongestDistanceDTO {
    country: string,
    value: number
}
export interface MostTracedDTO {
    country: string
    value: string
}

export interface ResponseStatisticsDTO {
    longest_distance: LongestDistanceDTO,
    most_traced: MostTracedDTO
}

export interface ResponseCalculateDTO {
    ip: string,
    name: string,
    code: string,
    currency: string,
    distance_to_usa: number,
    lat: number,
    lon: number,
    currencies: Array<CurrencyDTO>
}

