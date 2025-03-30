# 開発用：1ステージ構成でOK！
FROM node:18-alpine

WORKDIR /app

# package系を先にコピーしてキャッシュ効かせる
COPY package.json package-lock.json* ./

RUN npm ci

# アプリ全体をコピー（node_modules は docker-compose の volumes で上書きされる）
COPY . .

# Next.js の開発サーバー起動
CMD ["npm", "run", "dev"]
