import { GetItemInput } from "aws-sdk/clients/dynamodb";
import { SingletonDB } from "../../../common/db";

const SCHEMA = process.env.SCHEMA;
export class CountryRepository {
    public async getByCode(code: string): Promise<any> {
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
            return response.promise().then((item) => {
                return item;
            });
        } catch (err) {
            return err;
        }
    }

    public async getAll() {
        const params = {
            TableName: SCHEMA as string,
            ProjectionExpression: 'code, longest_distance_req, #name, req_amount',
            ExpressionAttributeNames: { '#name': 'name' },
        };

        try {
            const result = await SingletonDB.getInstance().ddb.scan(params);
            return result;
        } catch (err) {
            return err;
        }
    }


    public async saveData(countryData: any) {

        const params = {
            TableName: SCHEMA as string,
            Item: {
                ...countryData
            }
        };
        try {
            const response = await SingletonDB.getInstance().ddb.putItem(params);
            return response.promise().then((item) => {
                return item;
            });
        } catch (err) {
            return err;
        }
    }
}