import { Type } from './type';
import { Group } from './group';
import { VocabularyDetail } from './vocabulary-detail';

export class Vocabulary {
  constructor(
    public id: number,
    public type: Type,
    public article: string,
    public word: string,
    public favorite: boolean,
    public shown: boolean,
    public showCount: number,
    public group: Group,
    public photoUrl: string,
    public mineAdded: boolean,
    public priorty: number,
    public known: boolean,
    public vocabularyDetail: VocabularyDetail[]
  ) {}
}
