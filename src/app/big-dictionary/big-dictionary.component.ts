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
  meaningsOfTheWord: meaningsOfTheWord[];

  ngOnInit(): void {
  }

  ShowTheWord(word) {
    this.SentencesFromGlosbe(word);
    this.GetFromLinguee(word);
  }

  GetFromLinguee(word) {
    this.vocabularyService.getFromLinguee(word).subscribe(data => {
      console.log(JSON.stringify(data));
    })
  }

  SentencesFromGlosbe(word) {
    this.vocabularyService.getFromGlosbe(word).subscribe(data => {
      var htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      //gets related DOM elements from Glosbe
      // this.divID.nativeElement.innerHTML = htmlObject.outerHTML;

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

        //the Word
        this.meaningsOfTheWord[index].word = word;
        //all meanings
        this.meaningsOfTheWord[index].meaning = li.getElementsByClassName('text-info')[0]['childNodes'][0].textContent

        //the meanings only have type underneath
        if (li.getElementsByClassName('text-info').item(0).getElementsByClassName('gender-n-phrase').item(0) != null)
          this.meaningsOfTheWord[index].type = li.getElementsByClassName('text-info').item(0).getElementsByClassName('gender-n-phrase').item(0)['childNodes'][0].textContent.replace(/\s+/g, '');

        //example sentences(german)
        if (li.getElementsByClassName('examples').item(0) != null) {
          this.meaningsOfTheWord[index].exampleSentencesInGerman = li.getElementsByClassName('examples').item(0).getElementsByTagName('div').item(0).getElementsByTagName('div')[0].innerText.trim();

          //example sentences(turkish)
          this.meaningsOfTheWord[index].exampleSentencesInTurkish = li.getElementsByClassName('examples').item(0).getElementsByClassName('span6')[1].getElementsByTagName('div')[3].innerText;
        }
        index++;
      });

      const countOfTypesOfTheWord = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByTagName('h3').length;

      for (let i = 0; i < countOfTypesOfTheWord; i++) {

        //to get the article
        // if (htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i] != null) {
        //   this.meaningsOfTheWord[0].artikel = htmlObject.getElementsByTagName('div').namedItem('phraseTranslation').getElementsByClassName('defmetas')[i].getElementsByTagName('span')[3].textContent.replace(/\s+/g, '');
        // }
      }

      // this.meaningsOfTheWord.forEach(word => {
      //   if (word.type == "{noun}") {
      //     word.word = word.word.charAt(0).toUpperCase() + word.word.slice(1);
      //   }
      // });

      console.log(this.meaningsOfTheWord)

    });

  }
}
