const { application } = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui");

// Metadata info about API
const options =  { 
  definition: {
    openapi: "3.0.0",
    info: { title: "EuroCar WEB APP API", version: "1.0.0"},
  },
  apis: ["api/router/post.js", "api/router/auth.js", "api/router/user.js"],
};

// Docs en JSON

const swaggerSpec = swaggerJSDoc(options);

/// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("api/v1/docs.json", (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.send(swaggerSpec);
  });
  console.log(`Version 1 Docs are available at http://localhost:${port}/api/v1/docs`)
};

export default swaggerDocs ;