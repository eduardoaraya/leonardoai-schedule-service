import { Request, Response } from "express";
import chai from "chai";
import sinon from "sinon";
import { 
  taskController,
  ITaskController,
  ITaskService,
  ITaskQueryRequest,
  ITaskCreateRequest,
  ITaskUpdateRequest,
  ITaskResult
} from "@modules/task";

describe("taskController: Task controller http handler request", function() {
  let taskControllerInstance: ITaskController;
  let taskServiceMock: ITaskService;

  beforeEach(function() {
    taskServiceMock = {} as ITaskService;
    taskControllerInstance = taskController(taskServiceMock);
  });

  it("taskController.list: Should return a list of tasks", async () => {
    const req = {} as Request;
    const res = {} as Response<ITaskResult>;   
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });

    const currentDate = new Date();
    const result = { 
      id: "1122#$222112da#$$!!",
      accountId: 0,
      scheduleId: 0,
      duration: 0,
      startTime: currentDate.toString(),
    } as ITaskResult;

    const list = sinon.stub().returns([result]);

    res.status = status;
    res.send = send; 
    taskServiceMock.list = list;

    await taskControllerInstance.list(req, res);
    chai.assert.equal(status.callCount, 1, "status method from express Response should be called 1 time");
    chai.assert.equal(list.callCount, 1, "list method from service instance should be called 1 time");
    chai.assert.equal(send.callCount, 1, "send method from express Response should be called 1 time");
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(send, [result]);
  });

  it("taskController.list: Should return status 500 when list method throw an error", async () => {
    const req = {} as Request;
    const res = {} as Response<ITaskResult>;   
    const sendStatus = sinon.stub();
    const list = sinon.stub().throws();

    res.sendStatus = sendStatus;
    taskServiceMock.list = list;

    await taskControllerInstance.list(req, res);
    chai.assert.equal(list.callCount, 1, "list method from service instance should be called 1 time");
    chai.assert.equal(sendStatus.callCount, 1, "list method from service instance should be called 1 time");
    sinon.assert.calledWith(sendStatus, 500);
  });

  it("taskController.query: Should return a list of tasks from the query", async () => {
    const body = {};
    const req = { body } as Request<ITaskQueryRequest>;
    const res = {} as Response;
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    const currentDate = new Date();
    const result = { 
      id: "1122#$222112da#$$!!",
      accountId: 0,
      scheduleId: 0,
      duration: 0,
      startTime: currentDate.toString(),
    } as ITaskResult;
    const query = sinon.stub().returns([result]);
    res.status = status;
    res.send = send; 
    taskServiceMock.query = query; 

    await taskControllerInstance.query(req, res);

    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(send.callCount, 1);
    chai.assert.equal(query.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(query, body);
    sinon.assert.calledWith(send, [result]);
  });

  it("taskController.create: Should call the create 'task' process", async () => {
    const req = {} as Request<ITaskCreateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    const create = sinon.stub();

    res.sendStatus = sendStatus;
    taskServiceMock.create = create;

    await taskControllerInstance.create(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(create.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("taskController.update: Should call the update 'task' process", async () => {
    const req = {} as Request<ITaskUpdateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    const update = sinon.stub();

    res.sendStatus = sendStatus;
    taskServiceMock.update = update;

    await taskControllerInstance.update(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(update.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("taskController.delete: Should call the delete 'task' process", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const send = sinon.stub();
    const sendStatus = sinon.stub();
    const deleteCall = sinon.stub();
    const taskId = "1";
    res.sendStatus = sendStatus;
    taskServiceMock.delete = deleteCall;
    res.sendStatus = sendStatus;
    res.send = send;
    req.params = { taskId };

    await taskControllerInstance.delete(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(deleteCall.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
    sinon.assert.calledWith(deleteCall, Number(taskId));
  });

  it("taskController.take: Should call the take 'task' process", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    const take = sinon.stub();
    const taskId = "1";

    res.send = send;
    res.status = status;
    req.params = { taskId };
    taskServiceMock.take = take;

    await taskControllerInstance.take(req, res);

    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(take.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(take, Number(taskId));
  });
});
