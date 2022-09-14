export interface numberDynamoDTO{
    N: string
}

export interface stringDynamoDTO{
    S: string
}

export interface DynamoDBCountryDTO {
    code : stringDynamoDTO,
    name: stringDynamoDTO,
    longest_distance_req: numberDynamoDTO,
    req_amount: numberDynamoDTO,
}


