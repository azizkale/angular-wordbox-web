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
  @ViewChild('divID2') divID2: ElementRef;

  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  word: any;
  sentencesFromReverso: any[];
  sentencesFromFarlex: any[];
  sentencesFromGlosbe: any[];

  ngOnInit(): void {
    this.showVocabulary();
  }

  showVocabulary() {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  ShowTheWord(word) {
    this.SentencesFromReverso(word);
    this.SentencesFromFarlex(word);
    this.SentencesFromGlosbe(word);
  }

  SentencesFromReverso(word) {
    this.sentencesFromReverso = [];

    this.vocabularyService.getFromRewerso(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      for (let i = 0; i < 5; i++) {
        var obj = {
          germanSentence: htmlObject.getElementsByClassName('example')[i].getElementsByTagName('span')[0].textContent,
          turkishSentence: htmlObject.getElementsByClassName('example')[i].getElementsByTagName('span')[2].textContent
        }
        this.sentencesFromReverso.push(obj);
      }

    });
  }

  SentencesFromFarlex(word) {
    this.sentencesFromFarlex = [];

    this.vocabularyService.getFromFarlex(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;    

      this.divID2.nativeElement.innerHTML = htmlObject.getElementsByTagName('div').namedItem('Definition').outerHTML;

      for (let i = 0; i < 5; i++) {
        this.sentencesFromFarlex.push(htmlObject.getElementsByClassName('runseg')[i].getElementsByClassName('illustration')[0].textContent);
      }

     
    });
  }

  SentencesFromGlosbe(word) {
    this.sentencesFromGlosbe = [];

    this.vocabularyService.getFromGlosbe(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;
      this.divID.nativeElement.innerHTML = htmlObject.getElementsByClassName('tpac').item(0).getElementsByTagName('ul').item(0).outerHTML;
      console.log(htmlObject.getElementsByClassName('tpac'))

    });
  }
}
