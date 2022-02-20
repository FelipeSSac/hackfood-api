interface IFoodDataProvider {
  lactoseFree(name: string): Promise<boolean>
}

export { IFoodDataProvider };
