import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Take Home Challenge Yari Taft",
    description:
      "Documentación de la API para el take home challenge de la mentoría de Yari Taft",
  },
  host: "localhost:3001",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter your bearer token in the format: Bearer <token>",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
