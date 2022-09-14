import { PersistanceService } from '../../../services/persistance.service';
import { CountryRepository } from '../../../services/repositories/impl/mock/country.repository';
import { Country } from '../../../services/repositories/domain/country';
import { SingletonDB } from '../../../common/db.mock';

const repository = new CountryRepository();
const persistanceServiceMock = new PersistanceService(repository);
describe('Persistance service test', () => {
    process.env.SCHEMA = "countries-test";
    jest.setTimeout(9000000);

    beforeAll(() => {
        const deleteParams = {
            TableName: 'countries-dev'
        };

        SingletonDB.getInstance().ddb.deleteTable(deleteParams, function (err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });


        const createParams = {
            TableName: `countries-test`,
            KeySchema: [{ AttributeName: "code", KeyType: "HASH" }],
            AttributeDefinitions: [
                { AttributeName: "code", AttributeType: "S" }
            ],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        };

        SingletonDB.getInstance().ddb.createTable(createParams, function (err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("create table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    });
    test('updateStatistics - save new country and would be the most requested', async () => {
        const result = await persistanceServiceMock.updateStatistics('AR', 123, 'Argentina');
        const resultMostRequested = await persistanceServiceMock.getMostRequestedCountry();

        const { code, longestDistance, name, reqAmount } = resultMostRequested as Country;
        expect(result).toBe(true);
        expect(code).toBe('AR');
        expect(longestDistance).toBe(123);
        expect(name).toBe('Argentina');
        expect(reqAmount).toBe(1);
    });

    test('updateStatistics - save an previously created country - req amount', async () => {
        const result = await persistanceServiceMock.updateStatistics('AR', 99, 'Argentina');
        const resultMostRequested = await persistanceServiceMock.getMostRequestedCountry();

        const { code, longestDistance, name, reqAmount } = resultMostRequested as Country;
        expect(result).toBe(true);
        expect(code).toBe('AR');
        expect(longestDistance).toBe(123);
        expect(name).toBe('Argentina');
        expect(reqAmount).toBeGreaterThan(1);
    });

    test('updateStatistics - save an previously created country - longest distance 9999', async () => {
        await persistanceServiceMock.updateStatistics('AR', 99999, 'Argentina');
        await persistanceServiceMock.updateStatistics('AR', 123, 'Argentina');
        await persistanceServiceMock.updateStatistics('US', 0, 'EEUU');
        await persistanceServiceMock.updateStatistics('US', 0, 'EEUU');
        await persistanceServiceMock.updateStatistics('COL', 457, 'Colombia');
        await persistanceServiceMock.updateStatistics('AR', 7890, 'Argentina');

        const resultMostRequested = await persistanceServiceMock.getMostRequestedCountry();

        const { code, longestDistance, name } = resultMostRequested as Country;
        expect(code).toBe('AR');
        expect(longestDistance).toBe(99999);
        expect(name).toBe('Argentina');
    });


    test('updateStatistics - new longest distance country ', async () => {
        const result = await persistanceServiceMock.updateStatistics('UY', 888888888, 'Uruguay');
        const resultLongestDistance = await persistanceServiceMock.getLongestDistanceCountry();

        const { code, longestDistance, name, reqAmount } = resultLongestDistance as Country;
        expect(result).toBe(true);
        expect(code).toBe('UY');
        expect(longestDistance).toBe(888888888);
        expect(name).toBe('Uruguay');
        expect(reqAmount).toBe(1);
    });
});