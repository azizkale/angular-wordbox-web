import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'app-learnedwords',
  templateUrl: './learnedwords.component.html',
  styleUrls: ['./learnedwords.component.css'],
})

@Injectable()
export class LearnedwordsComponent implements OnInit {
  levelVocabularies: Vocabulary[];
  savedVocabularies: Vocabulary[];

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.GetSavedWordsFromLocalStorage();
  }

  GetLevelWordsFromJSON(): void {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  GetSavedWordsFromLocalStorage(): void {
    this.savedVocabularies = new Array<Vocabulary>();
    this.levelVocabularies.map((word: Vocabulary) => {
      this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
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
