import { Request, Response } from "express";
import chai from "chai";
import sinon from "sinon";
import { 
  userController,
  IUserController,
  IUserService,
  IUserQueryRequest,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserResult
} from "@modules/user";

describe("userController: User controller http handler request", function() {
  let userControllerInstance: IUserController;
  let userServiceMock: IUserService;

  beforeEach(function() {
    userServiceMock = {} as IUserService;
    userControllerInstance = userController(userServiceMock);
  });

  it("userController.list: Should return a list of users", async () => {
    const req = {} as Request;
    const res = {} as Response<IUserResult>;   
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    const result = {} as IUserResult;

    const list = sinon.stub().returns([result]);

    res.status = status;
    res.send = send; 
    userServiceMock.list = list;

    await userControllerInstance.list(req, res);
    chai.assert.equal(status.callCount, 1, "status method from express Response should be called 1 time");
    chai.assert.equal(list.callCount, 1, "list method from service instance should be called 1 time");
    chai.assert.equal(send.callCount, 1, "send method from express Response should be called 1 time");
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(send, [result]);
  });

  it("userController.list: Should return status 500 when list method throw an error", async () => {
    const req = {} as Request;
    const res = {} as Response<IUserResult>;   
    const sendStatus = sinon.stub();
    const list = sinon.stub().throws();

    res.sendStatus = sendStatus;
    userServiceMock.list = list;

    await userControllerInstance.list(req, res);
    chai.assert.equal(list.callCount, 1, "list method from service instance should be called 1 time");
    chai.assert.equal(sendStatus.callCount, 1, "list method from service instance should be called 1 time");
    sinon.assert.calledWith(sendStatus, 500);
  });

  it("userController.query: Should return a list of users from the query", async () => {
    const body = {};
    const req = { body } as Request<IUserQueryRequest>;
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
    } as IUserResult;
    const query = sinon.stub().returns([result]);
    res.status = status;
    res.send = send; 
    userServiceMock.query = query; 

    await userControllerInstance.query(req, res);

    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(send.callCount, 1);
    chai.assert.equal(query.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(query, body);
    sinon.assert.calledWith(send, [result]);
  });

  it("userController.create: Should call the create 'user' process", async () => {
    const req = {} as Request<IUserCreateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    const create = sinon.stub();

    res.sendStatus = sendStatus;
    userServiceMock.create = create;

    await userControllerInstance.create(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(create.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("userController.update: Should call the update 'user' process", async () => {
    const req = {} as Request<IUserUpdateRequest>;
    const res = {} as Response;
    const sendStatus = sinon.stub();
    const update = sinon.stub();

    res.sendStatus = sendStatus;
    userServiceMock.update = update;

    await userControllerInstance.update(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(update.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
  });

  it("userController.delete: Should call the delete 'user' process", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const send = sinon.stub();
    const sendStatus = sinon.stub();
    const deleteCall = sinon.stub();
    const userId = "1";
    res.sendStatus = sendStatus;
    userServiceMock.delete = deleteCall;
    res.sendStatus = sendStatus;
    res.send = send;
    req.params = { userId };

    await userControllerInstance.delete(req, res);

    chai.assert.equal(sendStatus.callCount, 1);
    chai.assert.equal(deleteCall.callCount, 1);
    sinon.assert.calledWith(sendStatus, 201);
    sinon.assert.calledWith(deleteCall, Number(userId));
  });

  it("userController.take: Should call the take 'user' process", async () => {
    const req = {} as Request;
    const res = {} as Response;
    const send = sinon.stub();
    const status = sinon.stub().returns({ send });
    const take = sinon.stub();
    const userId = "1";

    res.send = send;
    res.status = status;
    req.params = { userId };
    userServiceMock.take = take;

    await userControllerInstance.take(req, res);

    chai.assert.equal(status.callCount, 1);
    chai.assert.equal(take.callCount, 1);
    sinon.assert.calledWith(status, 200);
    sinon.assert.calledWith(take, Number(userId));
  });
});
