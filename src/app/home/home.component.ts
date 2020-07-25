import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service'

import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  word: any;

  ngOnInit(): void {
    this.showVocabulary();
    this.getDwdsResult();
  }

  showVocabulary()  {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  getDwdsResult() {
    this.vocabularyService.getFromDwdd().subscribe(data => {
      this.word = data;
      console.log('Success: ' + JSON.stringify(data));
    }, error => {
      console.log('Error: ' + JSON.stringify(error));
    });
  }

 

}
