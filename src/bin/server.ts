import  express, { Request, Response } from "express";
import { bootstrap, IApp } from "../app/bootstrap";
import http from "../infra/http";

// Routes
import { scheduleRouter, userRouter, taskRouter } from "@app/routes";

// Controllers
import { taskHandleFactory } from "@modules/task";
import { userHandleFactory } from "@modules/user";
import { scheduleHandleFactory } from "@modules/schedule";

bootstrap(http)
  .then(({ server, port, apiVersion, connection }: IApp) => {

    server.get("/", (_req: Request, res: Response) => {
      res.status(200).send({
        status: 'Ok', 
        apiVersion
      })
    });

    server.use("/task", taskRouter(express.Router(), taskHandleFactory(connection)));
    server.use("/schedule", scheduleRouter(express.Router(), scheduleHandleFactory(connection)));
    server.use("/user", userRouter(express.Router(), userHandleFactory(connection)));

    server.listen(
      port,
      () => console.log(`Server on port: ${port}`)
    );
})

