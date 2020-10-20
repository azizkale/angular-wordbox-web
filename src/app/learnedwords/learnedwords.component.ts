import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'learnedwords',
  templateUrl: './learnedwords.component.html',
  styleUrls: ['./learnedwords.component.css'],
})
export class LearnedwordsComponent implements OnInit {
  levelVocabularies: Vocabulary[];
  savedVocabularies: Vocabulary[];

  constructor(private vocabularyService: VocabularyService) {}

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.GetSavedWordsFromLocalStorage();
  }

  GetLevelWordsFromJSON() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  GetSavedWordsFromLocalStorage() {
    this.savedVocabularies = new Array<Vocabulary>();
    this.levelVocabularies.map((word: Vocabulary) => {
      this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
    });
  }

  StarsArray() {
    let array: Object[] = new Array(5);
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png']);
    return array;
  }

  StarsCSS() {
    let _width = window.outerWidth < 400 ? '30%' : '20%';
    return {
      width: _width,
      height: 'auto',
    };
  }
}
