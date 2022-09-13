import axios from 'axios';
/*
    Api Calls to IP API
*/
export class IPApiClient {
    async getGeoLocation(ip: string): Promise<any> {
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.get<any>(
              `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,lat,lon,currency`,
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
        
            console.log(JSON.stringify(data, null, 4));
        
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
        
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }
    }
}