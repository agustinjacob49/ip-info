module.exports = {
  tables: [
    {
      TableName: `countries-test`,
      KeySchema: [{ AttributeName: "code", KeyType: "HASH" }],
      AttributeDefinitions: [
        { AttributeName: "code", AttributeType: "S" }
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
  ],
};
