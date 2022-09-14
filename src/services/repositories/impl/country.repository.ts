import { GetItemInput } from "aws-sdk/clients/dynamodb";
import { SingletonDB } from "../../../common/db";
import { countryDTOtoDynamoDBDTOMapper, dynamoDbObjetToCountryMapper } from "../../../common/utils";
import { ICountryRepository } from "../country.repository";
import { Country } from '../domain/country';

const SCHEMA = process.env.SCHEMA;
export class CountryRepository implements ICountryRepository {
    public async getByCode(code: string): Promise<Country | null> {
        const params: GetItemInput = {
            TableName: SCHEMA as string,
            Key: {
                'code': { 'S': code }
            },
            ProjectionExpression: 'code, longest_distance_req, #name, req_amount',
            ExpressionAttributeNames: { '#name': 'name' },
        };
        try {
            const response = await SingletonDB.getInstance().ddb.getItem(params);
            return response.promise().then((res) => {
                const { Item: item } = res;
                return item ? dynamoDbObjetToCountryMapper(item) : null;
            });
        } catch (err: any) {
            const { data } = err;
            const { message } = data || {};
            const errorMessage = message || err.message || 'undefined error';
            throw new Error(`Something went wrong at CountryRepository - getByCode - ${errorMessage}`);
        }
    }

    public async getAll(): Promise<Array<Country>> {
        const params = {
            TableName: SCHEMA as string,
            ProjectionExpression: 'code, longest_distance_req, #name, req_amount',
            ExpressionAttributeNames: { '#name': 'name' },
        };

        try {
            const result = await SingletonDB.getInstance().ddb.scan(params);
            return result.promise().then((response) => {
                const { Items: items } = response;
                return items ? items.map((e) => (dynamoDbObjetToCountryMapper(e))) : [];
            });
        } catch (err: any) {
            const { data } = err;
            const { message } = data || {};
            const errorMessage = message || err.message || 'undefined error';
            throw new Error(`Something went wrong at CountryRepository - getAll - ${errorMessage}`);
        }
    }


    public async saveData(countryData: Country): Promise<boolean> {
        const params = {
            TableName: SCHEMA as string,
            Item: {
                ...countryDTOtoDynamoDBDTOMapper(countryData)
            }
        };
        try {
            const response = await SingletonDB.getInstance().ddb.putItem(params);
            return response.promise().then((res) => {
                return true;
            });
        } catch (err: any) {
            const { data } = err;
            const { message } = data || {};
            const errorMessage = message || err.message || 'undefined error';
            throw new Error(`Something went wrong at CountryRepository - saveData- ${errorMessage}`);
        }
    }
}