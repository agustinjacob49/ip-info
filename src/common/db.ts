
// Load the AWS SDK for Node.js
import AWS, { Credentials } from 'aws-sdk';
import { CredentialsOptions } from 'aws-sdk/lib/credentials';

export class SingletonDB {
    private static instance: SingletonDB;
    ddb: AWS.DynamoDB;

    private constructor() {
        AWS.config.update({ region: 'sa-east-1', credentials: new Credentials({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } as CredentialsOptions) });

        this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    }

    public static getInstance(): SingletonDB {
        if (!SingletonDB.instance) {
            SingletonDB.instance = new SingletonDB();
        }

        return SingletonDB.instance;
    }
}