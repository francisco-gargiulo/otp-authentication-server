# Node.js OTP Authentication Server

This Node.js microservice provides a simple OTP authentication flow with two endpoints:

1. `/send`: Sends an OTP to a given email address
2. `/verify`: Verifies the OTP and returns an access token

## Getting started

To get started with this project, you'll need to follow these steps:

1. Install the dependencies using `npm install`
2. Create a .env file with the following variables:

```env
SMTP_USERNAME=your-user
SMTP_PASSWORD=your-password
SMTP_HOST=host
SMTP_PORT=537
SESSION_SECRET=s3cr3t
JWT_SECRET=s3cr3t
```

## Run the application

```sh
npm start
```

## API Endpoints

Make requests to the endpoints using an HTTP client like Postman or cURL

### POST /send

To send an OTP to a given email address, run the following command:

```sh
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"username": "user@example.com", "nickname": "User"}' \
  http://localhost:3001/create
```

Response

If the request is successful, you should receive a 200 OK response with the following JSON object in the response body:

```json
{
  "message": "OK"
}
```

### POST /verify

To authenticate with an otp issued, run the following command:

```sh
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"password": "123"}' \
  http://localhost:3000/verify
```

Response

If the OTP is valid and the request is successful, you should receive a 200 OK response.

If the OTP is invalid, you should receive a 401 Unauthorized response.

If the maximum number of OTP verification attempts has been reached, you should receive a 403 Forbidden.

## License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).
