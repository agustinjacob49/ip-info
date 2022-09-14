import { Country } from '../services/repositories/domain/country';
import { stringDynamoDTO, DynamoDBCountryDTO } from '../dtos/DynamoDBCountry.dto';
import { DynamoDB } from 'aws-sdk';
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2022            :::
//:::                                                                         :::

const getDistanceTwoPoints = (lat1: number, lon1: number, lat2: number, lon2: number, unit: string) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1 / 180;
		const radlat2 = Math.PI * lat2 / 180;
		const theta = lon1 - lon2;
		const radtheta = Math.PI * theta / 180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit == "K") { dist = dist * 1.609344 }
		if (unit == "N") { dist = dist * 0.8684 }
		return dist;
	}
}

const dynamoDbObjetToCountryMapper = (item: DynamoDB.AttributeMap | undefined): Country => {
	if (item == undefined) {
		throw new Error('undefined attribute map - dynamoDbObjetToCountryMapper');
	}

	const { code: { S: code }, longest_distance_req: { N: longestDistance }, req_amount: { N: reqAmount }, name: { S: name } } = item as DynamoDB.AttributeMap;

	const country: Country = {
		code: code as string,
		longestDistance: parseFloat(longestDistance as string),
		reqAmount: parseInt(reqAmount as string),
		name: name as string,
	}

	return country;
}

const countryDTOtoDynamoDBDTOMapper = (countryData: Country): DynamoDBCountryDTO => {
	const { code, name, longestDistance: longest_distance_req, reqAmount: req_amount } = countryData;

	// country
	const newItem: DynamoDBCountryDTO = { 
		code : { S: code } as stringDynamoDTO,
		name: { S : name}  as stringDynamoDTO,
		longest_distance_req: {N: longest_distance_req.toString()},
		req_amount: {N: req_amount.toString()},
	};

	return newItem;
}

const isInvalidIPaddress = (ipaddress: string) => {  

	if(ipaddress == null || ipaddress == undefined){
		return true;
	}

	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
		return false
	}

	return (true)  
  }  

export {
	getDistanceTwoPoints,
	dynamoDbObjetToCountryMapper,
	countryDTOtoDynamoDBDTOMapper,
	isInvalidIPaddress
}