import { v4 } from 'uuid';

import { IIdGeneratorProvider } from '../entities/IIdGeneratorProvider';

class IdGeneratorProvider implements IIdGeneratorProvider {
  public generate(): string {
    return v4();
  }
}

export { IdGeneratorProvider };
