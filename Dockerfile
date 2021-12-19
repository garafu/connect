FROM node:14-alpine3.13

COPY . /app

RUN  \
cd /app; \
npm install;

EXPOSE 3000
WORKDIR /app
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]

