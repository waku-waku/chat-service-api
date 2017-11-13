# chat-service-api

> chat-service-api

## Build Setup


``` bash
# install dependencies
npm install

# docker run
docker-compose up -d(docker pull mongo)

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build

```

## Reference
https://openid-foundation-japan.github.io/draft-ietf-oauth-v2.ja.html

https://openid-foundation-japan.github.io/rfc6750.ja.html


## Bearer Authorization scheme

sample
```
GET /api/v1/users/me HTTP/1.1
Host: localhost:3000
Authorization: Bearer ********************************
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded
```