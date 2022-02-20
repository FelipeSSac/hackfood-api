interface ITranslatorProvider {
  translateToEng(text: string): Promise<any>
}

export { ITranslatorProvider };
