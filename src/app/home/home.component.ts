import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VocabularyService } from '../vocabulary.service'

import { Vocabulary } from '../models/vocabulary';
import { SearcingWord } from '../models/searcingword';

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

  searcingword: SearcingWord;

  ngOnInit(): void {
    this.showVocabulary();
  }

  showVocabulary() {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  ShowTheWord(word) {
    // this.SentencesFromReverso(word);
    // this.SentencesFromFarlex(word);
    this.WordsFromDwds(word);
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

      // this.divID2.nativeElement.innerHTML = htmlObject.getElementsByTagName('div').namedItem('Definition').outerHTML;

      for (let i = 0; i < 5; i++) {
        this.sentencesFromFarlex.push(htmlObject.getElementsByTagName('div').namedItem('Definition').getElementsByTagName('section')[i].getElementsByClassName('illustration')[0].innerHTML);
      }
    });
  }

  WordsFromDwds(word) {
    this.vocabularyService.getFromDwds(word).subscribe(data => console.log(data));
  }

  SentencesFromGlosbe(word) {

    this.vocabularyService.getFromGlosbe(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      this.divID.nativeElement.innerHTML = htmlObject.outerHTML;

      // this.divID2.nativeElement.innerHTML = null;

      var theNodesOfMeaningsFromGlosbe = htmlObject.getElementsByClassName('gl-white-box gl-pad mat-elevation-z2');
      var countOfMeaningOfTheWord = theNodesOfMeaningsFromGlosbe.length;
      // this.searcingword.word = this.word;


      for (let i = 0; i < countOfMeaningOfTheWord; i++) {
        // this.divID2.nativeElement.innerHTML += htmlObject.getElementsByTagName('app-translate-entry-translation').item(i).innerHTML;
        // this.divID2.nativeElement.innerHTML += theNodesOfMeaningsFromGlosbe[i].outerHTML;
        
        //word
        console.log(theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('h2').item(0));
        
        //type        
        console.log(theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('span').item(2));
        
        //meanings (j:number of h4(meanings of the same type))
        for (let j = 0; j < theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('h4').length - 1; j++) {
          console.log(theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('h4').item(j).innerHTML)
        }
        
        //if the type is noun, this code get the Artikel
        console.log(theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('app-translate-entry-summary-info').item(0).getElementsByClassName('translate-entry-summary-info-text ng-star-inserted').item(2))

        //example sentences (j:number of h4(meanings))
        var countOfExampleSentences = theNodesOfMeaningsFromGlosbe[i].getElementsByTagName('app-translate-entry-translation-examples').length;
        console.log(countOfExampleSentences)      


      }

    });
  }


}
