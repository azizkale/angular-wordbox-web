import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';
import {  Router } from '@angular/router';

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

  GetSavedWordsFromLocalStorage(): void {
    this.learnedWordsInAGroup = this.vocabularyService.wordsOfSelectedLevel;
  }

  GetLevelWords(groupp: number): void {
    this.router.navigate(['/motherpage'], { queryParams: { group: groupp } });
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
