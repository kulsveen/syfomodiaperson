FROM navikt/node-express:14-alpine
WORKDIR /syfomodiaperson

COPY server.ts package.json ./

COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist
COPY server ./server

EXPOSE 8080
CMD ["ts-node", "--transpile-only", "server.ts"]
