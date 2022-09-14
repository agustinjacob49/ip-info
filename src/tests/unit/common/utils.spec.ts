import { countryDTOtoDynamoDBDTOMapper, dynamoDbObjetToCountryMapper, getDistanceTwoPoints, isInvalidIPaddress } from "../../../common/utils";
import { Country } from '../../../services/repositories/domain/country';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBCountryDTO } from '../../../dtos/DynamoDBCountry.dto';

describe('Utils', () => {

    describe('Distance functions', () => {
        test('getDistanceTwoPoints - diferent', () => {
            const distance = getDistanceTwoPoints(11,-11, 12, -12, 'N');
            expect(distance).toBe(84.0016592553925);
        });

        test('getDistanceTwoPoints - zero', () => {
            const distance = getDistanceTwoPoints(11,-11, 11,-11, 'N');
            expect(distance).toBe(0);
        });
    });

    describe('Mapper functions', () => {
        test('dynamoDbObjetToCountryMapper - undefined well', () => {
            try {
                dynamoDbObjetToCountryMapper(undefined)
                // Fail test if above expression doesn't throw anything.
                expect(true).toBe(false);
            } catch (e: any) {
                expect(e.message).toBe('undefined attribute map - dynamoDbObjetToCountryMapper');
            }
        });

        test('dynamoDbObjetToCountryMapper - empty - Should throw exception', () => {
            try {
                dynamoDbObjetToCountryMapper({})
                // Fail test if above expression doesn't throw anything.
                expect(true).toBe(false);
            } catch (e: any) {
                expect(e.message).toBe('Cannot read property \'S\' of undefined');
            }
        });

        test('dynamoDbObjetToCountryMapper - well ', () => {

            const dynamoDBObject: DynamoDB.AttributeMap = { code: { S: 'AR' }, longest_distance_req: { N: '1234' }, req_amount: { N: '123' }, name: { S: 'Argentina' } };

            try {
                const result: Country = dynamoDbObjetToCountryMapper(dynamoDBObject);
                const { code, longestDistance, reqAmount , name } = result;
                expect(code).toBe('AR');
                expect(longestDistance).toBe(1234);
                expect(reqAmount).toBe(123);
                expect(name).toBe('Argentina');
                
            } catch (e: any) {
                // Fail test if above expression doesn't throw anything.
                console.log(e);
                expect(true).toBe(false);
            }
        });

        test('countryDTOtoDynamoDBDTOMapper - well', () => {
            try {
                const countryToMap: Country = { code: 'AR', longestDistance: 123, reqAmount: 123, name: 'Argentina'};

                const resultMap : DynamoDBCountryDTO = countryDTOtoDynamoDBDTOMapper(countryToMap);

                const { code: { S: code }, longest_distance_req: { N: longest_distance_req }, req_amount: { N: req_amount }, name: { S: name } } = resultMap;

                expect(code).toBe('AR');
                expect(longest_distance_req).toBe('123');
                expect(req_amount).toBe('123');
                expect(name).toBe('Argentina');
            } catch (e: any) {
                expect(true).toBe(false);
            }
        });
    });

    describe('Validator', () => {
        test('isInvalidIPaddress - empty', () => {
            const result = isInvalidIPaddress('');
            expect(result).toBe(true);
        });

        test('isInvalidIPaddress - Script', () => {
            const result = isInvalidIPaddress('../../');
            expect(result).toBe(true);
        });

        test('isInvalidIPaddress - Negative', () => {
            const result = isInvalidIPaddress('-1');
            expect(result).toBe(true);
        });

        test('isInvalidIPaddress - Out of range', () => {
            const result = isInvalidIPaddress('256.256.256.256');
            expect(result).toBe(true);
        });

        test('isInvalidIPaddress - Max range', () => {
            const result = isInvalidIPaddress('255.255.255.255');
            expect(result).toBe(false);
        });

        test('isInvalidIPaddress - Valid', () => {
            const result = isInvalidIPaddress('192.168.0.1');
            expect(result).toBe(false);
        });

    });
});