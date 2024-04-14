const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Nifixie API Documentation",
      version: "1.0.0",
      description: "Your efficient human consultant service provider.",
    },
    basePath: "/", // Base path for your API routes
  },
  apis: [
    "./routes/movies.js", // Path to your movies route file
    "./routes/techframework.js", // Path to your tech frameworks route file
    "./routes/techskill.js", // Path to your tech skill route file
    "./routes/chats.js", // Path to your chats route file
    "./routes/users.js", // Path to your users route file
    "./routes/auth.js", // Path to your auth route file
  ],
};

// Initialize Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger documentation
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
