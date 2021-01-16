FROM node:14.15.4-alpine3.12 AS builder

RUN apk add --no-cache git

WORKDIR /app
COPY package.json be.js tracing.js db.js ./
RUN yarn install

EXPOSE 4000
CMD ["node", "be.js"]
