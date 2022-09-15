# IP-INFO
API who returns geolocalization and currency info giving an IP adresses

# Requirements

- Nodejs - v14

# Technical information

- Typescript

- Pattern
   - Repository

- Framework
  - Express

- DB
  - DynamoDB

- IOC
  - awilix-express
  - awilix

- Testing
  - Jest
  - ts-jest
  - axios-mock

- Branching model
  - gitflow

# Run locally

* Clone repo

* npm install

* Set environment variables with your keys 
  * API_CURRENCY_KEY 
  * AWS_ACCESS_KEY_ID
  * AWS_SECRET_ACCESS_KEY

For production environment
* npm run dev

For development enviroment
* npm run start


# Postman collecton

# Endpoints

/ping

` curl --location --request GET 'http://ec2-18-230-187-62.sa-east-1.compute.amazonaws.com:8080/ping' `

/statistics
 
` curl --location --request GET 'http://ec2-18-230-187-62.sa-east-1.compute.amazonaws.com:8080/statistics' `

/trace
 
` curl --location --request POST 'http://ec2-18-230-187-62.sa-east-1.compute.amazonaws.com:8080/traces' \
--header 'Content-Type: application/json' \
--data-raw '{"ip":"47.20.156.156"}' `

# Test on produccion

Productive URL : http://ec2-18-230-187-62.sa-east-1.compute.amazonaws.com:8080/

# Infra

![image](https://user-images.githubusercontent.com/46901057/190286706-2b2e6fea-a279-46b9-9474-1a1bd467c0fd.png)
![image](https://user-images.githubusercontent.com/46901057/190286726-d501985f-5ef7-41af-990b-c2cfe63765ca.png)
![image](https://user-images.githubusercontent.com/46901057/190286745-3f58f0eb-0b72-4dbe-bb79-a93387fc9f13.png)

- EC2 
- DynamoDB

## Code coverage
![image](https://user-images.githubusercontent.com/46901057/190286873-9cbf4fec-800c-47ae-b3b6-66126b8e5b40.png)








