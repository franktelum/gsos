FROM node

RUN npm install -g nodemon
ADD ../../src /src
WORKDIR /src
CMD ["bash", "c", "npm install && npm start"]
