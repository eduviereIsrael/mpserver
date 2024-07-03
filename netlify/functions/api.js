// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors"
const bodyParser = require('body-parser');

const router = require('./routes/routes')

const api = express();

// const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

const corsOptions = {
    origin: 'https://marshalproverbs.netlify.app/', // Replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204 // For legacy browser support
  };

api.use(cors());
api.use(bodyParser.json());
api.use("/api/", router);

export const handler = serverless(api);
