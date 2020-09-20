import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearcingWord } from '../models/searcingword';
import { meaningsOfTheWord } from '../models/meaningsOfTheWord';
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
  meaningsOfTheWord: meaningsOfTheWord[];

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

      const countOfAllMeanings = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('ul').item(0).getElementsByClassName('phraseMeaning show-user-name-listener').length; // all meanings of the word


      console.log("meaning sayısı: " + countOfMeaningOfTheWord);
      console.log("text-info sayısı: " + theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info').length);
      console.log("examples sayısı: " + theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('examples').length);

      console.log("tüm anlamlar sayısı (ul ler): " + htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('ul').item(0).getElementsByClassName('phraseMeaning show-user-name-listener').length);

      const allLiTags = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('li');


      const liTagsHaveMeaningOfTheWords = [];
      this.meaningsOfTheWord = [];
      let index = 0;
      for (let i = 0; i < allLiTags.length; i++) {
        if (i % 3 == 0)
          liTagsHaveMeaningOfTheWords.push(allLiTags[i])
      }

      liTagsHaveMeaningOfTheWords.forEach(li => {
        this.meaningsOfTheWord[index] = new meaningsOfTheWord();
        //all meanings
        console.log(li.getElementsByClassName('text-info')[0]['childNodes'][0].textContent)
        this.meaningsOfTheWord[index].meaning = li.getElementsByClassName('text-info')[0]['childNodes'][0].textContent

        //the meanings only have type underneath
        if (li.getElementsByClassName('text-info').item(0).getElementsByClassName('gender-n-phrase').item(0) != null)
          // console.log(li.getElementsByClassName('text-info').item(0).getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent.trim());
          this.meaningsOfTheWord[index].type = li.getElementsByClassName('text-info').item(0).getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent.replace(/\s+/g, '');

        //example sentences(german)
        if (li.getElementsByClassName('examples').item(0) != null) {
          // console.log(li.getElementsByClassName('examples').item(0).getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText);
          this.meaningsOfTheWord[index].exampleSentencesInGerman = li.getElementsByClassName('examples').item(0).getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText.trim();

          //example sentences(turkish)
          console.log(li.getElementsByClassName('examples').item(0).getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText)
          this.meaningsOfTheWord[index].exampleSentencesInTurkish = li.getElementsByClassName('examples').item(0).getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText;
        }
        index++;
      });

      console.log(this.meaningsOfTheWord);












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
      this.meaningsOfTheWord = [];

      for (let i = 0; i < countOfAllMeanings; i++) {

        if (theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0) != null) {
          this.meaningsOfTheWord[i] = new meaningsOfTheWord();

          //turkis meanings of the word
          this.searchingWord.meanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByTagName('strong').item(0)['childNodes'][0].textContent)
          this.meaningsOfTheWord[i].meaning = theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByTagName('strong').item(0)['childNodes'][0].textContent;

          //type (type for each meanings)
          this.searchingWord.typeOfEachMeanings.push(theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent)
          this.meaningsOfTheWord[i].type = theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info')[i + 1].getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent.trim();
        }
        else {
          this.meaningsOfTheWord[i] = new meaningsOfTheWord();
          this.meaningsOfTheWord[i].type = "";
        }
      }
      for (let i = 0; i < countOfAllMeanings + 1; i++) {
        //example sentences(german)
        if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i] != null) {

          this.searchingWord.exampleSentencesInGerman.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText);
          this.meaningsOfTheWord[i].exampleSentencesInGerman = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText;

          //example sentences(turkish)
          this.searchingWord.exampleSentencesInTurkish.push(htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText);
          this.meaningsOfTheWord[i].exampleSentencesInTurkish = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('examples')[i].getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText;
        }

      }

      this.searchingWord.id = 999;
      console.log(this.searchingWord)
      console.log(this.meaningsOfTheWord)
    });

  }
}
