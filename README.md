<h1>Product App</h1>

This app was built with the help of MNRN stack (Mongo DB, NestJS, React, Node).

The project is divided into two categories:

1) Backend which is built with the help of NestJS

Product model is designed as follows:

```
export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
});

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
}  
```

To run the backend api do the following from the root directory:

```
cd backend
npm start run:dev
```

2) Frontend which is made with the help of React

React skeleton was made with the help of the following command:

```
npx create-react-app my-app
```
To run the frontend part do the following from the root directory:

```
cd frontend
npm start
```

<h3>Docker</h3>

Docker implementation for the api-server (or backend part)

```
docker build ./backend/ -t api-server

docker images

docker run -p 3001:3001 api-server
```

For frontend 

```
docker build ./frontend/ -t react-app

docker images

docker run -p 3000:3000 react-app
```
