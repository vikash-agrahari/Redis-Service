# POC - Redis Caching Implementation for Enhanced Data Management

This project demonstrates the integration of Redis caching to optimize data management in signup, login, and OTP verification APIs. Leveraging Redis as an in-memory data store enhances performance and scalability. Redis acts as a caching layer, reducing database load and speeding up response times for frequent operations. Coupled with Node.js and Express.js for API development, this implementation ensures efficient handling of user authentication processes. Redis's high-speed data retrieval capabilities complement the project's goals of delivering a responsive and reliable user experience.

## Installation

1. Clone the repository:


```bash
git clone https://github.com/shivi1000/POC-Redis-Caching.git

```

## Branch Switch

1. Switch to dev branch:

```bash
git checkout dev

```


## 1.1 Project Structure

- **src:** Source code of the POC-Redis Caching Implementation for Enhanced Data Management in Nest js


## Installation

- Install dependencies:

```bash
npm install

```


## 1.2 Environment Setup

- Create bin folder in root directory

```bash
mkdir bin

```

- Create a file named

```bash
.env.dev

```

## Base configuration

```bash
PORT=8005          //replace with your NestJS port

```


## MONGO DB

```bash
URI=''             //add your mongodb database url

```

## REDIS

```bash
REDIS_INDEX_SESSION=0        //add your redis index session
REDIS_HOST=127.0.0.1          //add your redis host
REDIS_PORT=6379

```


## 1.3 Start the Project

- Start the service:

```bash
npm run dev

```


## 2.7 API Documentation

- **_Redis Caching API:_** http://localhost:8005/swagger#/

- *Sample Request Body for signup:*

```bash
{
  "fullName": "Shivani Sharma",
  "password": "User@123",
  "email": "string@gmail.com",
  "mobileNo": "+19876543210"
}

```

- *Sample Request Body for login:*

```bash
{
  "mobileNo": "+19876543210",
  "password": "User@123"
}

```

- *Sample Request Body for verify otp:*

```bash
{
  "userId": "65cdbe067e089c53ee0c4714",
  "otp": "123456"
}
```



