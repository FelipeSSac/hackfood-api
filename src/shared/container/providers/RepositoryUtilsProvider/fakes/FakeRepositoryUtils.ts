import { IRepositoryUtils, ITransaction } from '../entities/IRepositoryUtils';

class FakeRepositoryUtils implements IRepositoryUtils {
  public async transaction({ data }: ITransaction): Promise<void> {
    data.forEach(async ({ entity, repository }) => {
      await repository.save(entity);
    });
  }
}

export { FakeRepositoryUtils };
