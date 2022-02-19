import { getRepository, Repository } from 'typeorm';

import { IUser } from '@modules/users/entities/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<IUser>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public create({
    id,
    name,
    email,
    password,
  }: ICreateUserDTO): IUser {
    const user = this.ormRepository.create({
      id,
      name,
      email,
      password,
    });

    return user;
  }

  public async index({
    page,
    limit,
  }: IPaginatedRequest): Promise<IPaginatedResponse<IUser>> {
    const [users, total] = await this.ormRepository
      .createQueryBuilder('users')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    return {
      results: users,
      page,
      limit,
      total,
    };
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const userSaved = await this.ormRepository.save(user);

    return userSaved;
  }

  public async remove(user: IUser): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export { UsersRepository };
