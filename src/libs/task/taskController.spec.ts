import { Request, Response } from "express";
import { 
  taskController,
  ITaskController,
  ITaskService,
  ITaskQueryRequest,
  ITaskCreateRequest,
  ITaskUpdateRequest,
} from "../../../../src/libs/task";
import chai from "chai";
import sinon from "sinon";

describe("taskController: Task controller http handler request", function() {
  let taskControllerInstance: ITaskController;
  let taskServiceMock: ITaskService = {
    list: async () => [],
    query: async () => [],
    create: async () => true,
    update: async () => true,
    delete: async () => true,
  };

  beforeEach(function() {
    taskControllerInstance = taskController(taskServiceMock);
  });

  it("taskController.list: Should return a list of tasks", async () => {
    const req = {} as Request;
    const res = {} as Response;    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    res.status = status;
    res.send = send; 

    await taskControllerInstance.list(req, res);
    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(send.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(send, []);
  });

  it("taskController.query: Should return a list of tasks aim the giving query", async () => {
    const req = {} as Request<ITaskQueryRequest>;
    const res = {} as Response;
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    res.status = status;
    res.send = send; 

    await taskControllerInstance.query(req, res);

    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(send.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(send, []);
  });

  it("taskController.create: Should call the create 'task' process", async () => {
    const req = {} as Request<ITaskCreateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    res.sendStatus = sendStatus;

    await taskControllerInstance.create(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("taskController.update: Should call the update 'task' process", async () => {
    const req = {} as Request<ITaskUpdateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    res.sendStatus = sendStatus;

    await taskControllerInstance.update(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("taskController.delete: Should call the delete 'task' process", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const send = sinon.stub();
    const sendStatus = sinon.stub();
    const status = sinon.stub().returns({ send });
    res.sendStatus = sendStatus;
    res.send = send;
    res.status = status;

    await taskControllerInstance.delete(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });
});
