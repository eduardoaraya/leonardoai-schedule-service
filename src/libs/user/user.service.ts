import { 
  IUserRepository,
  IUserBase,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserQueryRequest,
  IUserService
} from "./user.contracts";

export function userService(repository: IUserRepository): IUserService {
  return {
    async list(): Promise<IUserBase[]>  {
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
    async take(userId: number) {
      return repository.take(userId);
    }
  }
};
