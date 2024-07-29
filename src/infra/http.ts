import express, { Request, Response } from "express";

const server = express();

server.use(express.json());

export default server;
