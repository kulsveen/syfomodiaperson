FROM node:14-alpine
WORKDIR /syfomodiaperson

COPY package.json ./

COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist
COPY server ./server

EXPOSE 8080
CMD ["node", ".dist/server.js"]
