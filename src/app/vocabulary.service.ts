import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {


  vocabularyUrl = 'assets/vocabulary.json'; //JSON

  wordsOfSelectedLevel: Vocabulary[];


  constructor(private httpClient: HttpClient) { }

  getVocabularies(): Observable<Vocabulary[]> {
    return this.httpClient
      .get<Vocabulary[]>(this.vocabularyUrl)
  }

  getFromDwdd() {
    return this.httpClient.get('/dwdsapi/?q=Haus');
  }

  GetLevelWords(group: number) {
    this.wordsOfSelectedLevel = new Array<Vocabulary>();
    this.getVocabularies()
      .subscribe((data) => {
        data.map(voc => {
          voc.group === group ? this.wordsOfSelectedLevel.push(voc) : ""
        })
      });
    return this.wordsOfSelectedLevel
  }

}
