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
  randomWordIndex: number;

  constructor(
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
    this.GetLevelWords();
    this.ProduceRandomWord();
  }
  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  GetLevelWords() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  ProduceRandomWord() {
    let minID = this.levelVocabularies[0].id;
    let maxID = this.levelVocabularies[this.levelVocabularies.length - 1].id;
    this.randomWordIndex = Math.floor(Math.random() * (maxID - minID + 1)) + minID;
  }
}
