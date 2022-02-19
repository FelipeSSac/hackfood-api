/* eslint-disable no-unused-vars */
interface IRepository {
  save(entity: any): Promise<any>;
}

interface IEntity{
  entity: Record<any, any>;
  repository: IRepository;
}

export interface ITransaction {
  data: IEntity[];
}

interface IRepositoryUtils {
  transaction(data: ITransaction): Promise<void>;
}

export { IRepositoryUtils };
