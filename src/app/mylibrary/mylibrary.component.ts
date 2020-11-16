import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { VocabularyService } from '../vocabulary.service';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  constructor(
    private vocabularyService: VocabularyService,
    private apollo: Apollo
    ) { }

  vocabularies: Vocabulary[];
  searchedWord: [];
  word: any;

  ngOnInit(): void {

  }

  findTheMeaning(word: string): void {
    this.apollo
      .query<any>({
        query: gql`
        {
          localWords {
            id
            title
            mean
          }
        }
      `
      })
      .subscribe(
        ({ data }) => {
          this.searchedWord = data.localWords;
          console.log(this.searchedWord)
        }
      );
  }
}
