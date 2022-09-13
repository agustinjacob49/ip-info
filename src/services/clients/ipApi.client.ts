/*
    Api Calls to IP API
*/
export class IPApiClient {
    async getGeoLocation(ip: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({
                "query": "24.48.0.1",
                "status": "success",
                "country": "Canada",
                "countryCode": "CA",
                "region": "QC",
                "regionName": "Quebec",
                "city": "Montreal",
                "zip": "H1K",
                "lat": 45.6085,
                "lon": -73.5493,
                "timezone": "America/Toronto",
                "isp": "Le Groupe Videotron Ltee",
                "org": "Videotron Ltee",
                "as": "AS5769 Videotron Telecom Ltee"
            });
            }, 1500);
          });
    }
}