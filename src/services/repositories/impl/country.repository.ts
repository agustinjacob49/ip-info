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
        const result = null;

        try {
            const result = await SingletonDB.getInstance().ddb.getItem(params);
            console.log(result);
        } catch (err) {
            console.log(err);
        }


        return result;
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
        const result = null;

        try {
            const result = await SingletonDB.getInstance().ddb.getItem(params);
            console.log(result);
        } catch (err) {
            console.log(err);
        }


        return result;
    } 
}