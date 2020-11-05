import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learnedwords',
  templateUrl: './learnedwords.component.html',
  styleUrls: ['./learnedwords.component.css'],
})

@Injectable()
export class LearnedwordsComponent implements OnInit {
  learnedWordsInAGroup: Vocabulary[];

  constructor(
    private vocabularyService: VocabularyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetSavedWordsFromLocalStorage();
  }

  // to list the shown words when user comes here to from exercises menu
  GetSavedWordsFromLocalStorage(): void {
    this.learnedWordsInAGroup = [];
    this.vocabularyService.wordsOfSelectedLevel.map(word => {
      this.learnedWordsInAGroup.push(JSON.parse(localStorage.getItem(word.id.toString())))
    });
  }

  GetLevelWords(groupp: number): void {
    this.learnedWordsInAGroup = [];
    this.vocabularyService.getVocabularies()
      .subscribe((data) => {
        data.map((voc: Vocabulary) => {
          if (voc.group == groupp) {
            this.learnedWordsInAGroup.push(JSON.parse(localStorage.getItem(voc.id.toString())));
          }
        })
      });
  }

  StarsArray(): Array<object> {
    const array: object[] = new Array(5);
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png']);
    return array;
  }

  StarsCSS(): object {
    const Width = window.outerWidth < 400 ? '30%' : '20%';
    return {
      width: Width,
      height: 'auto',
    };
  }
}
