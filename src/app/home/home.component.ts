import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VocabularyService } from '../vocabulary.service'

import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('divID') divID: ElementRef;

  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  word: any;
  sentences: any;

  ngOnInit(): void {
    this.showVocabulary();
    this.getDwdsResult();
    // this.getDwdsSentences();

  }

  showVocabulary() {
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

  getDwdsSentences() {
    this.vocabularyService.getFromDwdsSentences().subscribe(data => {
      this.sentences = data;
      this.divID.nativeElement.innerHTML=data;


    });
  }


}
