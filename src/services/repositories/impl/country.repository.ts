import { GetItemInput } from "aws-sdk/clients/dynamodb";
import { SingletonDB } from "../../../common/db";

export class CountryRepository {
    public async getByCode(code: string) {
        const params: GetItemInput = {
            TableName: 'countries',
            Key: {
                'code': {'S': code}
            },
            ProjectionExpression: 'code, longest_distance_req, #name',
            ExpressionAttributeNames: {'#name': 'name'},
        };

        try {
            const result = await SingletonDB.getInstance().ddb.getItem(params);
            console.log(result);
            return result;
        } catch (err) {
            return err;
        }
    } 


    public async saveData(code: string) {
        const params: GetItemInput = {
            TableName: 'countries',
            Key: {
                'code': {'S': code}
            },
            ProjectionExpression: 'code, longest_distance_req, #name',
            ExpressionAttributeNames: {'#name': 'name'},
        };

        try {
            const result = await SingletonDB.getInstance().ddb.getItem(params);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    } 
}