import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearcingWord } from '../models/searcingword';
import { VocabularyService } from '../vocabulary.service';

@Component({
  selector: 'app-big-dictionary',
  templateUrl: './big-dictionary.component.html',
  styleUrls: ['./big-dictionary.component.css']
})
export class BigDictionaryComponent implements OnInit {

  @ViewChild('divID') divID: ElementRef;


  constructor(
    private vocabularyService: VocabularyService
  ) { }
  searchingWord: SearcingWord;

  ngOnInit(): void {
  }

  ShowTheWord(word) {
    this.SentencesFromGlosbe(word);
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
      const countOfMeaningOfTheWord = theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('gender-n-phrase').length; // the words with the type underneath are gotten


      console.log("meaning sayısı: "+countOfMeaningOfTheWord);

      const countOfTypesOfTheWord = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('h3').length;

      this.searchingWord.countOfTypesOfTheWord = countOfTypesOfTheWord;

      for (let i = 0; i < countOfTypesOfTheWord; i++) {
        //type (type for only general meanings)(i use it to get all infos(gender, fonetic etc.) of the word)    
        console.log(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('h3')[i]['childNodes'][0])

        //all infos of the words
        if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i] != null) {
          this.searchingWord.infos.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span'))
        }

        //to get the article
        if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i] != null) {
          const countOfAllInfosOfTheWord = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span').length;
          if (countOfAllInfosOfTheWord == 6) {
            this.searchingWord.artikel = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span')[3].textContent;
          }
        }
      }

      for (let i = 0; i < theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info').length; i++) {

        if (theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i].getElementsByClassName('gender-n-phrase').item(0) != null) {

          //turkis meanings of the word      
          this.searchingWord.meanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i].getElementsByTagName('strong')[0].innerText)


          //type (type for each meanings)         
          this.searchingWord.typeOfEachMeanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i].getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent)

          //example sentences(german)
          if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples') != null) {
            this.searchingWord.exampleSentencesInGerman.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByTagName('div')[1].innerText);

            //example sentences(turkish)          
            this.searchingWord.exampleSentencesInTurkish.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText)
          }

        }

      }
      this.searchingWord.id = 999;
      console.log(this.searchingWord)
    });

  }
}
