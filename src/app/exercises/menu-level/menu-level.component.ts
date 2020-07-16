import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';

@Component({
  selector: 'menu-level',
  templateUrl: './menu-level.component.html',
  styleUrls: ['./menu-level.component.css']
})
export class MenuLevelComponent implements OnInit {

  levelVocabularies: Vocabulary[];

  constructor(
    private vocabularyService: VocabularyService,
  ) { }

  ngOnInit(): void {
    this.GetLevelWords();
  }

  SetMarginButtons() {
    return {
      "my-3": window.innerHeight < 576,
      "btn-info": window.innerHeight > 0,
      "btn": window.innerHeight > 0
    }
  }

  GetLevelWords() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

}
