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

  searchingWord: SearcingWord;


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
    // this.WordsFromDwds(word);
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

    this.searchingWord = new SearcingWord();
    this.searchingWord.meanings = [];
    this.searchingWord.infos = [];
    this.searchingWord.typeOfEachMeanings = [];
    this.searchingWord.exampleSentencesInGerman = [];
    this.searchingWord.exampleSentencesInTurkish = [];

    this.searchingWord.word = word;
    this.vocabularyService.getFromGlosbe(word).subscribe(data => {

      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      this.divID.nativeElement.innerHTML = htmlObject.outerHTML;

      const theNodesOfMeaningsFromGlosbe = htmlObject.getElementsByTagName('article');
      const countOfMeaningOfTheWord = theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info').length - 1;

      const countOfTypesOfTheWord = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('h3').length;

      this.searchingWord.countOfTypesOfTheWord = countOfTypesOfTheWord;

      console.log("type sayısı:" + countOfTypesOfTheWord)

      for (let i = 0; i < countOfTypesOfTheWord; i++) {
        //type (type for only general meanings)(i use it to get all infos(gender, fonetic etc.) of the word)    
        console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('h3')[i]['childNodes'][0])

        //all infos of the words
        if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i] != null) {
          console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span'))
          this.searchingWord.infos.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span'))
        }

        else{
          this.searchingWord.infos.push("no info")
        }
        
        //to get the article
        if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i] != null) {
          const countOfAllInfosOfTheWord = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span').length;
          console.log('info sayısı: ' + countOfAllInfosOfTheWord)
          if (countOfAllInfosOfTheWord == 6) {
            console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span')[3]);
            this.searchingWord.artikel = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span')[3].textContent;
          }
        }


      }

      //========Because there are some problems, that codes below are here
      console.log("türkçe anlam sayısı" + countOfMeaningOfTheWord)
      for (let i = 0; i < countOfMeaningOfTheWord; i++) {        

        if (theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0) != null) {

          //turkis meanings of the word
        console.log(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByTagName('strong').item(0));
        this.searchingWord.meanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByTagName('strong').item(0)['childNodes'][0].textContent)


          //type (type for each meanings)
          console.log(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0])
          this.searchingWord.typeOfEachMeanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent)

          //example sentences(german)
          if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i] != null) {
            console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByTagName('div').item(0).getElementsByTagName('div')[0]);
            this.searchingWord.exampleSentencesInGerman.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText);

            //example sentences(turkish)
            console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByClassName('span6')[1].getElementsByTagName('div')[3])
            this.searchingWord.exampleSentencesInTurkish.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText)
          }

        }
        // else {
        //   //example sentences(german)
        //   this.searchingWord.exampleSentencesInGerman.push('no example sentence');

        //   //example sentences(turkish)           
        //   this.searchingWord.exampleSentencesInTurkish.push('no example sentence');

        //   //type (type for each meanings)
        //   this.searchingWord.typeOfEachMeanings.push('no type')
        // }
      }
      this.searchingWord.id = 999;
      console.log(this.searchingWord)      
    });

  }


}
