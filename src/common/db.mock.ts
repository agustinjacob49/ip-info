
// Local the AWS SDK for Node.js
import AWS from 'aws-sdk';

export class SingletonDB {
    private static instance: SingletonDB;
    ddb: AWS.DynamoDB;

    private constructor() {
        const config = {
            convertEmptyValues: true,
            endpoint: 'localhost:8000',
            sslEnabled: false,
            region: 'local-env',
            accessKeyId: 'xxxx',
            secretAccessKey: 'xxxx',
        };
        
        AWS.config.update(config);

        this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    }

    public static getInstance(): SingletonDB {
        if (!SingletonDB.instance) {
            SingletonDB.instance = new SingletonDB();
        }

        return SingletonDB.instance;
    }
}