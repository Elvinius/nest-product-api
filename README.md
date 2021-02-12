<h1>Product App</h1>

This app was built with the help of MNRN stack (Mongo DB, NestJS, React, Node).

The project is divided into two categories:

1) Backend which is built with the help of NestJS
2) Frontend which is made with the help of React

<h3>Docker</h3>
Docker implementation for the api-server (or backend part)

``
docker build ./backend/ -t api-server

docker images

docker run -p 3001:3001 api-server

``

For frontend 

``
docker build ./frontend/ -t react-app

docker images

docker run -p 3000:3000 react-app

``