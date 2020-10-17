export class SearcingWord {
  constructor(
    public id?: number,
    public word?: string,
    public artikel?: string,
    public countOfTypesOfTheWord?: number,
    public meanings?: string[],
    public typeOfEachMeanings?: string[],
    public exampleSentencesInTurkish?: string[],
    public exampleSentencesInGerman?: string[],
    public infos?: any[]
  ) {}
}
