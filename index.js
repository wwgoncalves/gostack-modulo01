const express = require("express");

const server = express();

// Query params: ?name=Will
// Route params: /users/1
// Request body: { "name": "Fulano", "email": "fulano@mailserver.com" }

server.use(express.json());

server.get("/test", (request, response) => {
  const name = request.query.name;

  return response.json({ message: `Hello ${name}!` });
});

const users = ["William", "Ramon", "John", "Robert"];

server.get("/users", (request, response) => {
  return response.json(users);
});

server.get("/users/:index", (request, response) => {
  const { index } = request.params;

  return response.json(users[index]);
});

server.post("/users", (request, response) => {
  const { name } = request.body;

  users.push(name);

  return response.json(users);
});

server.put("/users/:index", (request, response) => {
  const { index } = request.params;
  const { name } = request.body;

  users[index] = name;

  return response.json(users);
});

server.delete("/users/:index", (request, response) => {
  const { index } = request.params;

  users.splice(index, 1);

  return response.json(users);
});

server.listen(3000);
