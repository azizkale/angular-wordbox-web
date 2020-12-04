import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

const queryListWords = gql`
  query ListWords($voc: String, $token: String) {
    listWords(voc: $voc, token: $token) {
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
`;

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
  alerNothingFound: Boolean = false;
  alertLogIn: Boolean = false;
  private querySubscription: Subscription;

  ngOnInit(): void {}

  findTheMeaning(wrd: string): void {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: queryListWords,
        variables: {
          voc: wrd,
          token: localStorage.getItem('user'),
        },
      })
      .valueChanges.subscribe((data) => {
        if (data.data.listWords != null) {
          this.searchedWord = data.data.listWords;
          this.alerNothingFound = true;
        } else {
          this.alertLogIn = true;
        }
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  closeAlert() {
    this.alertLogIn = false;
  }
}
