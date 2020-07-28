import { Injectable, Type } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  vocabularyUrl = 'assets/vocabulary.json';
  wordsOfSelectedLevel: Vocabulary[];

  constructor(private httpClient: HttpClient) { }

  getVocabularies(): Observable<Vocabulary[]> {
    return this.httpClient
      .get<Vocabulary[]>(this.vocabularyUrl)
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

  getFromDwdd() {
    return this.httpClient.get('/dwdsapi/?q=Haus');
  }

  getFromRewerso(word: string) {
    return this.httpClient.get('/reversoapi/%C3%BCbersetzung/deutsch-t%C3%BCrkisch/' + word, { 'responseType': 'text' });
  }

  getFromFarlex(word: string) {
    return this.httpClient.get('/farlexapi/' + word, { 'responseType': 'text' });
  }


}
