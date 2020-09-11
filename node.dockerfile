FROM node:latest
MAINTAINER Chule Cabral
COPY . /var/www
WORKDIR /var/www
RUN npm install 
ENTRYPOINT ["npm", "start"]
EXPOSE 3000:12345
