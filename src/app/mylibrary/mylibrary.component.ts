import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  constructor(
    private apollo: Apollo
  ) { }

  vocabularies: Vocabulary[];
  searchedWord = [];
  word: any;

  ngOnInit(): void {

  }

  findTheMeaning(word: string): void {
    this.apollo
      .query<any>({
        query: gql`
        {
            localWords {
              word
              type
              group
              showCount
              vocabularyDetail{
                id
                language
                vocabularyId
                sentenceMeaning
              }
            }
        }
      `
      })
      .subscribe(
        ({ data }) => {
          data.localWords.map(w => {
            if (w.word.includes(word)) {
              this.searchedWord.push(w)
            }
          })
        }
      );
  }
}
