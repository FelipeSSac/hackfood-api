import { translate } from 'free-translate';

import { ITranslatorProvider } from '../entities/ITranslatorProvider';

class TranslatorProvider implements ITranslatorProvider {
  public async translateToEng(text: string): Promise<any> {
    const translatedText = await translate(text, { to: 'en' });

    return translatedText;
  }
}

export { TranslatorProvider };
