FROM node:20.10.0
WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 3665
CMD npm run dev -- --host=0.0.0.0
