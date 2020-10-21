import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';
import { SearcingWord } from '../models/searcingword';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent implements OnInit {
  @ViewChild('divID') divID: ElementRef;
  @ViewChild('divID2') divID2: ElementRef;
  types: any[];

  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  searchedWord: Vocabulary[];

  word: any;
  sentencesFromReverso: any[];
  sentencesFromFarlex: any[];

  searchingWord: SearcingWord;
  ngOnInit(): void {
    this.showVocabulary();
  }

  showVocabulary(): void {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  findTheMeaning(word: string): void {
    this.searchedWord = new Array<Vocabulary>();
    this.vocabularies.find((w) => {
      if (w.word.includes(word)) {
        this.searchedWord.push(w);
      }
    });
  }

  SentencesFromReverso(word): void {
    this.sentencesFromReverso = [];

    this.vocabularyService.getFromRewerso(word).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      for (let i = 0; i < 5; i++) {
        const obj = {
          germanSentence: htmlObject
            .getElementsByClassName('example')
          [i].getElementsByTagName('span')[0].textContent,
          turkishSentence: htmlObject
            .getElementsByClassName('example')
          [i].getElementsByTagName('span')[2].textContent,
        };
        this.sentencesFromReverso.push(obj);
      }
    });
  }

  SentencesFromFarlex(word): void {
    this.sentencesFromFarlex = [];

    this.vocabularyService.getFromFarlex(word).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      // this.divID2.nativeElement.innerHTML = htmlObject.getElementsByTagName('div').namedItem('Definition').outerHTML;

      for (let i = 0; i < 5; i++) {
        this.sentencesFromFarlex.push(
          htmlObject
            .getElementsByTagName('div')
            .namedItem('Definition')
            .getElementsByTagName('section')
          [i].getElementsByClassName('illustration')[0].innerHTML
        );
      }
    });
  }

  WordsFromDwds(word): void {
    this.vocabularyService.getFromDwds(word).subscribe((data) => console.log(data));
  }

  SentencesFromGlosbe(word): void {
    this.searchingWord = new SearcingWord();
    this.searchingWord.meanings = [];
    this.searchingWord.infos = [];
    this.searchingWord.typeOfEachMeanings = [];
    this.searchingWord.exampleSentencesInGerman = [];
    this.searchingWord.exampleSentencesInTurkish = [];

    this.searchingWord.word = word;
    this.vocabularyService.getFromGlosbe(word).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      this.divID.nativeElement.innerHTML = htmlObject.outerHTML;

      const theNodesOfMeaningsFromGlosbe = htmlObject.getElementsByTagName('article');
      const countOfMeaningOfTheWord =
        theNodesOfMeaningsFromGlosbe[0].getElementsByClassName('text-info').length - 1;

      const countOfTypesOfTheWord = htmlObject
        .getElementsByTagName('div')
        .namedItem('phraseTranslation')
        .getElementsByTagName('h3').length;

      this.searchingWord.countOfTypesOfTheWord = countOfTypesOfTheWord;

      for (let i = 0; i < countOfTypesOfTheWord; i++) {
        // type (type for only general meanings)(i use it to get all infos(gender, fonetic etc.) of the word)

        // all infos of the words
        if (
          htmlObject
            .getElementsByTagName('div')
            .namedItem('phraseTranslation')
            .getElementsByClassName('defmetas')[i] != null
        ) {
          this.searchingWord.infos.push(
            htmlObject
              .getElementsByTagName('div')
              .namedItem('phraseTranslation')
              .getElementsByClassName('defmetas')
            [i].getElementsByTagName('span')
          );
        } else {
          this.searchingWord.infos.push('no info');
        }

        // to get the article
        if (
          htmlObject
            .getElementsByTagName('div')
            .namedItem('phraseTranslation')
            .getElementsByClassName('defmetas')[i] != null
        ) {
          const countOfAllInfosOfTheWord = htmlObject
            .getElementsByTagName('div')
            .namedItem('phraseTranslation')
            .getElementsByClassName('defmetas')
          [i].getElementsByTagName('span').length;
         
          if (countOfAllInfosOfTheWord === 6) {
            this.searchingWord.artikel = htmlObject
              .getElementsByTagName('div')
              .namedItem('phraseTranslation')
              .getElementsByClassName('defmetas')
            [i].getElementsByTagName('span')[3].textContent;
          }
        }
      }

      // ========Because there are some problems, that codes below are here
      for (let i = 0; i < countOfMeaningOfTheWord; i++) {
        if (
          theNodesOfMeaningsFromGlosbe[0]
            .getElementsByClassName('text-info')
          [i + 1].getElementsByClassName('gender-n-phrase')
            .item(0) != null
        ) {
          // turkis meanings of the word
          this.searchingWord.meanings.push(
            theNodesOfMeaningsFromGlosbe[0]
              .getElementsByClassName('text-info')
            [i + 1].getElementsByTagName('strong')
              .item(0)['childNodes'][0].textContent
          );

          // type (type for each meanings)
          this.searchingWord.typeOfEachMeanings.push(
            theNodesOfMeaningsFromGlosbe[0]
              .getElementsByClassName('text-info')
            [i + 1].getElementsByClassName('gender-n-phrase')
              .item(0)['childNodes'][0].textContent
          );

          // example sentences(german)
          if (
            htmlObject
              .getElementsByTagName('div')
              .namedItem('phraseTranslation')
              .getElementsByClassName('examples')[i] != null
          ) {
            this.searchingWord.exampleSentencesInGerman.push(
              htmlObject
                .getElementsByTagName('div')
                .namedItem('phraseTranslation')
                .getElementsByClassName('examples')
              [i].getElementsByTagName('div')
                .item(0)
                .getElementsByTagName('div')[0].innerText
            );

            // example sentences(turkish)
            this.searchingWord.exampleSentencesInTurkish.push(
              htmlObject
                .getElementsByTagName('div')
                .namedItem('phraseTranslation')
                .getElementsByClassName('examples')
              [i].getElementsByClassName('span6')[1]
                .getElementsByTagName('div')[3].innerText
            );
          }
        }
      }
    });
  }

  GetFromLinguee(word): void {
    this.vocabularyService.getFromLinguee(word).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;
      this.divID.nativeElement.innerHTML = htmlObject.outerHTML;

      const wordtype = htmlObject
        .getElementsByTagName('div')
        .namedItem('dictionary')
        .getElementsByClassName('tag_wordtype');
      this.types = [];
      for (let i = 0; i < wordtype.length; i++) {
        console.log(wordtype[i].textContent);
        this.types.push(wordtype[i].textContent);
      }
    });
  }
}
