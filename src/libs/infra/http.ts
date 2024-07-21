import express, { Request, Response } from "express";

const server = express();

server.get(
  "/",
  (_req: Request, res: Response) => 
    res.status(200).send({
      status: 'Ok', 
      apiVersion: process.env.API_VERSION 
    })
);

export default server;
