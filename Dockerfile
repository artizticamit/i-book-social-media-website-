FROM node:14-bullseye-slim

WORKDIR /usr/local/app/client

RUN apt-get update  && apt-get upgrade -y

COPY client/package.json client/package-lock.json /usr/local/app/

RUN npm install

COPY . /usr/local/app/

ENTRYPOINT [ "npm" ]

CMD ["run", "start"]
