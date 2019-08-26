const express = require("express");

const server = express();

// Query params: ?name=Will
// Route params: /users/1
// Request body: { "name": "Fulano", "email": "fulano@mailserver.com" }

server.use(express.json());

// Global middleware
server.use((request, response, next) => {
  console.time("Request");
  console.log(`Method: ${request.method} | URL: ${request.url}`);
  next();
  console.timeEnd("Request");
});

// Local middlewares
function checkNameExists(request, response, next) {
  if (!request.body.name) {
    return response.status(400).json({ error: "User name is required." });
  }

  return next();
}

function checkUserInArray(request, response, next) {
  const user = users[request.params.index];
  if (!user) {
    return response.status(400).json({ error: "User does not exist." });
  }

  request.user = user;

  return next();
}

server.get("/test", (request, response) => {
  const name = request.query.name;

  return response.json({ message: `Hello ${name}!` });
});

const users = ["William", "Ramon", "John", "Robert"];

server.get("/users", (request, response) => {
  return response.json(users);
});

server.get("/users/:index", checkUserInArray, (request, response) => {
  return response.json(request.user);
});

server.post("/users", checkNameExists, (request, response) => {
  const { name } = request.body;

  users.push(name);

  return response.json(users);
});

server.put(
  "/users/:index",
  checkUserInArray,
  checkNameExists,
  (request, response) => {
    const { index } = request.params;
    const { name } = request.body;

    users[index] = name;

    return response.json(users);
  }
);

server.delete("/users/:index", checkUserInArray, (request, response) => {
  const { index } = request.params;

  users.splice(index, 1);

  return response.json(users);
});

server.listen(3000);
