# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]