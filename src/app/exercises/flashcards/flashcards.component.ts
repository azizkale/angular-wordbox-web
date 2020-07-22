import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';
import { Directive, HostListener, ElementRef } from '@angular/core';


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
  wordsToLearn: Vocabulary[];
  savedVocabularies: Vocabulary[];
  showMe: boolean;

  constructor(
    private vocabularyService: VocabularyService,
    private element: ElementRef

  ) { }

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.SaveAllWords();
    this.SetWordsToLearn();
    this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
    this.showMe = true;
  }

  flip: string = 'inactive';

  toggleFlip(shownword: Vocabulary) {
    switch (this.flip) {

      case 'inactive':
        setTimeout(() => {
          this.flip = 'active'
        }, 200);
        break;

      case 'active':
        if (!this.shownWord.showCount) {
          this.shownWord.showCount = 0;
        }
        shownword.showCount++;
        localStorage.setItem(shownword.id.toString(), JSON.stringify(shownword));
        setTimeout(() => {
          this.flip = 'inactive';
          setTimeout(() => { //changes shownWord to next one
            this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
          }, 1000);
        }, 1000);
        this.SetWordsToLearn();

        break;
    }
  }

  GetLevelWordsFromJSON() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  SaveAllWords() {
    //saves the words to localstorage if it was be not saved before
    this.levelVocabularies.map(wrd => {
      if (localStorage.getItem(wrd.id.toString()) === null) {
        localStorage.setItem(wrd.id.toString(), JSON.stringify(wrd));
      }
    })
  }

  GetSingleWordFromLocalStorage(index: string): Object {
    return JSON.parse(localStorage.getItem(index))
  }

  GetSavedWordsFromLocalStorage() {
    this.savedVocabularies = new Array<Vocabulary>();
    this.levelVocabularies.map((word: Vocabulary) => {
      this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
    })
  }

  SetWordsToLearn() {
    this.GetSavedWordsFromLocalStorage();
    this.wordsToLearn = new Array<Vocabulary>();
    this.savedVocabularies.map((wrd: Vocabulary) => {
      if ((wrd.showCount == null || wrd.showCount < 6) && this.wordsToLearn.length < 10) {
        this.wordsToLearn.push(wrd);
      }
    })

  }



  DynamicCSS() {
    return {
      'col-12': window.outerWidth < 576,
      'col-8': window.outerWidth >= 576
    }
  }

  StarsArray() {
    let array: Object[] = new Array(5)
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png'])
    return array
  }

  CardAnimation(shownword: Vocabulary, event) {
    document.querySelector('.card').classList.toggle('is-flipped');

    if (!document.querySelector('.card').classList[2]) {

      (!this.shownWord.showCount) ? this.shownWord.showCount = 0 : '';
      shownword.showCount++;
      localStorage.setItem(shownword.id.toString(), JSON.stringify(shownword));
      setTimeout(() => { //changes shownWord to next one
        this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
      }, 1000);
      this.SetWordsToLearn();
      this.showMe = true;

    }

    else{
      this.showMe = false;
    }
  }

  WordsProgressBarHeight(){
    return {
      'progress': window.outerWidth < 576,
    }
  }
}
