import { IUser } from '@modules/users/entities/IUser';

import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): IUser;
  index(data: IPaginatedRequest): Promise<IPaginatedResponse<IUser>>;
  findById(id: number): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
}

export { IUsersRepository };
