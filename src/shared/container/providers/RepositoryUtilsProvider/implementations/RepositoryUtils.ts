import { QueryRunner, getConnection } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { IRepositoryUtils, ITransaction } from '../entities/IRepositoryUtils';

class RepositoryUtils implements IRepositoryUtils {
  private queryRunner: QueryRunner;

  constructor() {
    const connection = getConnection();
    this.queryRunner = connection.createQueryRunner();
  }

  public async transaction({ data }: ITransaction): Promise<void> {
    try {
      const entities = data.map((dataObject) => (
        dataObject.entity
      ));

      await this.queryRunner.connect();
      await this.queryRunner.startTransaction();

      await this.queryRunner.manager.save(entities);
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();

      throw new AppError('A transaction falhou!');
    } finally {
      await this.queryRunner.release();
    }
  }
}

export { RepositoryUtils };
