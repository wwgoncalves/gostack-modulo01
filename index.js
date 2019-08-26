const express = require("express");

const server = express();

// Query params: ?name=Will
// Route params: /users/1
// Request body: { "name": "Fulano", "email": "fulano@mailserver.com" }

server.get("/test", (request, response) => {
  const name = request.query.name;

  return response.json({ message: `Hello ${name}!` });
});
server.get("/users/:id", (request, response) => {
  //const userID = request.params.id;
  const { id } = request.params;

  return response.json({ message: `Hello ${id}!` });
});

server.listen(3000);
