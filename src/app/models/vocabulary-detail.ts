import { Language } from './language';

export class VocabularyDetail {
  constructor(
    public id: number,
    public vocabularyId: number,
    public description: string,
    public meaning: string,
    public language: Language
  ) {}
}
