import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';


@Component({
  selector: 'flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlashcardsComponent implements OnInit {

  levelVocabularies: Vocabulary[];
  shownWord: Vocabulary;
  indexOfShownWord: number;

  constructor(
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
    this.GetLevelWords();
    this.shownWord = this.levelVocabularies[0];
    this.indexOfShownWord = 0;
  }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  GetLevelWords() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  DynamicCSS() {
    return {
      'col-12': window.outerWidth < 576,
      'col-8': window.outerWidth >= 576
    }
  }

  NextWord(event) {
    event.stopPropagation();
    if (this.indexOfShownWord <= this.levelVocabularies[this.levelVocabularies.length - 1].id) {
      this.shownWord = this.levelVocabularies[++this.indexOfShownWord]
    }

  }

  PreviousWord(event) {
    event.stopPropagation();
    if (this.indexOfShownWord > 0) {
      this.shownWord = this.levelVocabularies[--this.indexOfShownWord]
    }

  }
}
