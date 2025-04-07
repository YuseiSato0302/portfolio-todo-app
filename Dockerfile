FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

# Next.js の開発サーバー起動
CMD ["npm", "run", "dev"]
