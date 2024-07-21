import express, { Request, Response } from "express";

const app = express();

app.get("/healthcheck", (_req: Request, res: Response) => res.status(200).send({ status: 'Ok', apiVersion: 0 }));

export default app;
