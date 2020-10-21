import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';

@Component({
  selector: 'app-motherpage',
  templateUrl: './motherpage.component.html',
  styleUrls: ['./motherpage.component.css'],
})
export class MotherpageComponent implements OnInit {
  constructor(private vocabularyService: VocabularyService) {}

  levelVocabularies: Vocabulary[];

  ngOnInit(): void {}

  SetMarginButtons(): object {
    return {
      'my-3': window.innerHeight < 576,
      'btn-info': window.innerHeight > 0,
      btn: window.innerHeight > 0,
    };
  }

  GetLevelWords(group: number): void {
    this.levelVocabularies = this.vocabularyService.GetLevelWords(group);
  }
}
