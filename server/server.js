import Express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import BasicAuth from "express-basic-auth";
import mongoose from "mongoose";
import cors from "cors";
import ResponseHandler from "./utils/respone.js";
import errorHandle from "./utils/errorHandle.js";
import apis from "./endpoint.js";
import swaggerSpec from "./docs.js";
import logger from "./logger.js";

const { PORT, USER_API_DOCS, PASS_API_DOCS, MONGO_URI } = process.env;

const app = new Express();
app.use(cors({ credentials: true, origin: "http://localhost:5001" }));
app.use(
  morgan((tokens, req, res) => {
    const responeMess = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");

    if (res.statusCode < 400) logger.info(responeMess);
    else logger.error(res.statusMessage);

    return responeMess;
  })
);
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

app.use((req, res, next) => {
  res.RH = new ResponseHandler(res);
  next();
});

app.use(
  "/api-docs",
  BasicAuth({ users: { [USER_API_DOCS]: PASS_API_DOCS }, challenge: true }),
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
);

app.use("/", apis);

app.use(errorHandle);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (data) => {
    logger.info("Mongodb connected");
  })
  .catch((error) => {
    console.log(error);
    logger.error("Please make sure Mongodb is installed and running!");
    process.exit(1);
  });

const httpServer = http.createServer(app, (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  });
  res.end("Hi there!");
});

httpServer.listen(PORT, async (error) => {
  if (error) {
    logger.error("Cannot start backend services.");
    logger.error(error);
  } else {
    logger.info(`Backend service is running on port: ${PORT}.`);
  }
});
