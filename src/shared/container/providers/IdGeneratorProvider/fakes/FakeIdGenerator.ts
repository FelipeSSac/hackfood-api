import { IIdGeneratorProvider } from '../entities/IIdGeneratorProvider';

class FakeIdGeneratorProvider implements IIdGeneratorProvider {
  public generate(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z0-9]+/g, '');
  }
}

export { FakeIdGeneratorProvider };
