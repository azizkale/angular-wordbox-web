import { Injectable, Type } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';

// TODO : delete unused libraries
import { catchError, retry } from 'rxjs/operators';

import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {


  vocabularyUrl = 'assets/vocabulary.json'; //JSON

  wordsOfSelectedLevel: Vocabulary[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getVocabularies(): Observable<Vocabulary[]> {
    return this.httpClient
      .get<Vocabulary[]>(this.vocabularyUrl)
  }

  getByIDFromUrl() {
    return this.httpClient.get('/jwbapi/vocabulary/16101');
  };

  addVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
    return this.httpClient.post<Vocabulary>('/jwbapi/add', vocabulary, this.httpOptions);
  }

  updateVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
    return this.httpClient.post<Vocabulary>('/jwbapi/update', vocabulary, this.httpOptions);
  }

  deleteVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
    return this.httpClient.post<Vocabulary>('/jwbapi/delete', vocabulary, this.httpOptions);
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

  getFromRewerso(word: string) {
    return this.httpClient.get('/reversoapi/%C3%BCbersetzung/deutsch-t%C3%BCrkisch/' + word, { 'responseType': 'text' });
  }

  getFromFarlex(word: string) {
    return this.httpClient.get('/farlexapi/' + word, { 'responseType': 'text' });
  }

  // getFromGlosbe(word: string) {
  //   return this.httpClient.get('https://myserver-deploy.herokuapp.com/api?word=' + word, { 'responseType': 'text' });
  // }

  getFromGlosbe(word: string) {
    return this.httpClient.get('/glosbeapi/de/tr/' + word, { 'responseType': 'text' });
  }

  getFromDwds(word: string) {
    return this.httpClient.get('/dwdsapi/?q=' + word, { 'responseType': 'text' });
  }

  getFromLinguee(word: string) {
    return this.httpClient.get('/linguee/' + word, { 'responseType': 'text' });
  }

}
