import  express, { Request, Response } from "express";
import { bootstrap, IApp } from "../app/bootstrap";
import http from "../infra/http";

// Routes
import { taskRouter } from "../app/routes/task.router";
import { userRouter } from "../app/routes/user.router";
import { scheduleRouter } from "../app/routes/schedule.router";

// Controllers
import { taskHandleFactory } from "../libs/task";
import { userHandleFactory } from "../libs/user";
import { scheduleHandleFactory } from "../libs/schedule";

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


