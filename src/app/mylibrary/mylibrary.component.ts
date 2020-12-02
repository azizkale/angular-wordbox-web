import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  constructor(private apollo: Apollo, private router: Router) {}

  vocabularies: Vocabulary[];
  searchedWord = [];
  word: any;

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('user')) == null) {
      this.router.navigate(['authentication']);
    }
  }

  findTheMeaning(word: string): void {
    this.apollo
      .query<any>({
        query: gql`
          {
            listWords {
              word
              type
              group
              showCount
              vocabularyDetail {
                id
                language
                vocabularyId
                sentenceMeaning
              }
            }
          }
        `,
      })
      .subscribe(({ data }) => {
        data.listWords.map((w) => {
          if (w.word.includes(word)) {
            this.searchedWord.push(w);
          }
        });
      });
  }
}
