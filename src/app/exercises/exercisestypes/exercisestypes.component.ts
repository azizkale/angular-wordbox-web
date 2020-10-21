import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-exercisestypes',
  templateUrl: './exercisestypes.component.html',
  styleUrls: ['./exercisestypes.component.css'],
})
export class ExercisestypesComponent implements OnInit {
  levelVocabularies: Vocabulary[];
  flip: string;
  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit(): void {
    this.GetLevelWords();
  }

  SetMarginButtons(): object {
    return {
      'my-3': window.innerHeight < 576,
      'btn-info': window.innerHeight > 0,
      btn: window.innerHeight > 0,
    };
  }

  GetLevelWords(): void {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }


  toggleFlip(): void {
    this.flip = 'inactive';
    this.flip = this.flip === 'inactive' ? 'active' : 'inactive';
  }
}
