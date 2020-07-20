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
  wordsToLearn: Vocabulary[];


  constructor(
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.SaveAllWords();
    this.SetWordsToLearn();
    this.NextWord(event);
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

  SetWordsToLearn() {
    //picks the 10 words up to learn in every times, according to the showCount of the words
    let ind: number = this.levelVocabularies[0].id;
    let wrd: Vocabulary;
    this.wordsToLearn = new Array<Vocabulary>();

    for (let i = 0; i < this.levelVocabularies.length; i++) {
      wrd = this.GetSingleWordFromLocalStorage(ind.toString()) as Vocabulary;
      if ((wrd.showCount == null || wrd.showCount < 6) && this.wordsToLearn.length < 10) {
        this.wordsToLearn.push(wrd);
        ind++;
      }
    }

  }

  DynamicCSS() {
    return {
      'col-12': window.outerWidth < 576,
      'col-8': window.outerWidth >= 576
    }
  }

  NextWord(event) {
    event.stopPropagation();
    this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
  }

  StarsArray() {
    let array: Object[] = new Array(5)
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png'])
    return array
  }

}
