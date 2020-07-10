import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  vocabularyUrl = 'assets/vocabulary.json';

  constructor(private httpClient: HttpClient) { }

  getVocabularies() : Observable<Vocabulary[]> {
    return this.httpClient
    .get<Vocabulary[]>(this.vocabularyUrl)
  }
  
}
