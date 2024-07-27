import  express from "express";
import http from "../../infra/http";
import { bootstrap, IApp } from "../../app/bootstrap";
import serverlessExpress from "@codegenie/serverless-express";
import { task } from "../../app/routes/task";
import { taskHandleFactory } from "../../libs/task";

let serverlessExpressInstance = null;

async function setup() {
  const { server, connection }: IApp = await bootstrap(http);
  const router = express.Router();
  server.use("/task", task(router, taskHandleFactory(connection)));
  return server;
}

export function handle(_event, _context) {
  if (serverlessExpressInstance) return serverlessExpressInstance;

  return async (_event, _context) => {
    serverlessExpressInstance = serverlessExpress({
      app: await setup()
    });

    return serverlessExpressInstance;
  }
}

