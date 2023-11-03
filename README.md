
# Depression and Suicidal Thoughts Support Chat App

to run the app locally, you need to have nodejs and mongodb installed on your machine or docker.

prototype of the app
<div style="text-align:center;">
  <img src="./Screenshot 2023-10-31 at 23.22.33.png" style="max-width:80%; display:block; margin:auto;">
</div>

## Installation

cd into server and client folder and run the following command

```bash
npm install
```

if you have docker run the following command to start the app

```bash
docker-compose up -d
```

/server.env file:

```env
MONGO_URI="yourMongodburi"
MONGO_URI_TEST="mongodbUriForTest"
NODE_ENV="development"
DATABASE_ENV='mongo'
TEST_DATABASE='test'
DATABASE="chat-helper"
PORT="5000"
JWT_SECRET='yoursecret'
GOOGLE_CLIENT_ID="yourGoogleClientId"
GOOGLE_SECRET_ID="yourGoogleSecretId"
GOOGLE_OAUTH_REDIRECT_URL="yourGoogleRedirectURL"
```


