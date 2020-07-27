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
  exampleS: any;

  ngOnInit(): void {
    this.showVocabulary();
    // this.getDwdsSentences();

  }

  showVocabulary() {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  getDwdsSentences() {
    let word = "Buch"
    this.vocabularyService.getFromDwdsSentences(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;     
      console.log(htmlObject.getElementsByClassName('example')[0].getElementsByTagName('span')[0].textContent);




      // this.sentences = data;
      // this.divID.nativeElement.innerHTML = data;

      // this.exampleS = document.getElementsByTagName('div').item(0).getElementsByClassName('example')[0].getElementsByTagName('span');
      // console.log(this.exampleS)


    });
  }


}
