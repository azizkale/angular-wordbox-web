import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  vocabularyUrl = 'assets/vocabulary.json'; //JSON

  constructor(private httpClient: HttpClient) { }

  getVocabularies(): Observable<Vocabulary[]> {
    return this.httpClient
      .get<Vocabulary[]>(this.vocabularyUrl)
  }

  getFromDwdd() {
    return this.httpClient.get('/dwdsapi/?q=Haus');
  }
}
