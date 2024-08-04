import { 
  IUserRepository,
  IUser,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserQueryRequest,
  IUserService,
  IUserSelect
} from "./user.contracts";

export function userService(repository: IUserRepository): IUserService {
  return {
    async list(): Promise<IUser[]>  {
      return repository.list();
    },
    async query(request: IUserQueryRequest) { 
      return repository.query(request);
    },
    async create(request: IUserCreateRequest) { 
      await repository.create(request);
      return true;
    },
    async update(request: IUserUpdateRequest, userId: number) { 
      await repository.update(request, userId);
      return true;
    },
    async delete(userId: number) {
      return repository.delete(userId);
    },
    async getById(userId: number, select?: IUserSelect) {

      return repository.getById(userId, select);
    }
  }
};
