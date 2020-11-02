import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Vocabulary } from '../app/models/vocabulary';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  vocabularyUrl = 'assets/vocabulary.json'; // JSON

  wordsOfSelectedLevel: Vocabulary[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  getVocabularies(): Observable<Vocabulary[]> {
    return this.httpClient.get<Vocabulary[]>(this.vocabularyUrl);
  }

  // getByIDFromUrl(): Observable<any> {
  //   return this.httpClient.get('/jwbapi/vocabulary/16101');
  // }

  // addVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
  //   return this.httpClient.post<Vocabulary>('/jwbapi/add', vocabulary, this.httpOptions);
  // }

  // updateVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
  //   return this.httpClient.post<Vocabulary>('/jwbapi/update', vocabulary, this.httpOptions);
  // }

  // deleteVocabularyTest(vocabulary: Vocabulary): Observable<Vocabulary> {
  //   return this.httpClient.post<Vocabulary>('/jwbapi/delete', vocabulary, this.httpOptions);
  // }

  GetLevelWords(groupp: number): Vocabulary[] {
    this.wordsOfSelectedLevel = new Array<Vocabulary>();
    this.getVocabularies().subscribe((data) => {
      data.map((voc) => {
        voc.group === groupp 
        ? this.wordsOfSelectedLevel.push(voc) 
        : this.wordsOfSelectedLevel = this.wordsOfSelectedLevel;
      });
    });
    return this.wordsOfSelectedLevel;
  }

  // getFromGlosbe(word: string): Observable<any> {
  //   return this.httpClient.get('https://myserver-deploy.herokuapp.com/api?word=' + word, { 'responseType': 'text' });
  // }

  getFromGlosbe(word: string): Observable<any> {
    return this.httpClient.get('/glosbeapi/de/tr/' + word, { responseType: 'text' });
  }
}
