import  express, { Request, Response } from "express";
import { bootstrap, IApp } from "../app/bootstrap";
import http from "../infra/http";

import { task } from "../app/routes/task";
import { taskHandleFactory } from "../libs/task";

bootstrap(http)
.then(({ server, port, apiVersion, connection }: IApp) => {
  const router = express.Router();

  server.get("/", (_req: Request, res: Response) => {
    res.status(200).send({
      status: 'Ok', 
      apiVersion
    })
  });

  server.use("/task", task(router, taskHandleFactory(connection)));

  server.listen(
    port,
    () => console.log(`Server on port: ${port}`)
  );
})


