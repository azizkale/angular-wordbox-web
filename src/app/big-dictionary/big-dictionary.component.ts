import { Component, OnInit } from '@angular/core';
import { MeaningsOfTheWord } from '../models/meaningsOfTheWord';
import { VocabularyService } from '../vocabulary.service';


@Component({
  selector: 'app-big-dictionary',
  templateUrl: './big-dictionary.component.html',
  styleUrls: ['./big-dictionary.component.css'],
})
export class BigDictionaryComponent implements OnInit {

  constructor(private vocabularyService: VocabularyService) { }
  meaningsOfTheWord: MeaningsOfTheWord[];
  types: string[];
  surchedWord: string;
  error: boolean;

  ngOnInit(): void { }

  ShowTheWord(word): void {
    this.SentencesFromGlosbe(word);
  }

  SentencesFromGlosbe(input): void {
    this.error = false;
    this.meaningsOfTheWord = [];
    const word = input.model;
    this.vocabularyService.getFromGlosbe(word).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      // when the response is empty, it gives alert 
      if (data === '') {
        this.error = true;
      }

      const allLiTags = htmlObject
        .getElementsByTagName('div')
        .namedItem('phraseTranslation')
        .getElementsByTagName('li');

      const liTagsHaveMeaningOfTheWords = [];
      this.meaningsOfTheWord = [];
      let index = 0;

      for (let i = 0; i < allLiTags.length; i++) {
        if (i % 3 === 0) {
          liTagsHaveMeaningOfTheWords.push(allLiTags[i]);
        }
      }

      liTagsHaveMeaningOfTheWords.forEach((li) => {
        this.meaningsOfTheWord[index] = new MeaningsOfTheWord();

        // the Word
        this.meaningsOfTheWord[index].word = word;
        // all meanings
        this.meaningsOfTheWord[index].meaning = li.getElementsByClassName('text-info')[0][
          'childNodes'
        ][0].textContent;

        // the meanings only have type underneath
        if (
          li
            .getElementsByClassName('text-info')
            .item(0)
            .getElementsByClassName('gender-n-phrase')
            .item(0) != null
        ) {
          this.meaningsOfTheWord[index].type = li
            .getElementsByClassName('text-info')
            .item(0)
            .getElementsByClassName('gender-n-phrase')
            .item(0)
          ['childNodes'][0].textContent.replace(/\s+/g, '');
        }


        // example sentences(german)
        if (li.getElementsByClassName('examples').item(0) != null) {
          this.meaningsOfTheWord[index].exampleSentencesInGerman = li
            .getElementsByClassName('examples')
            .item(0)
            .getElementsByTagName('div')
            .item(0)
            .getElementsByTagName('div')[0]
            .innerText.trim();

          // example sentences(turkish)
          this.meaningsOfTheWord[index].exampleSentencesInTurkish = li
            .getElementsByClassName('examples')
            .item(0)
            .getElementsByClassName('span6')[1]
            .getElementsByTagName('div')[3].innerText;
        }

        // removes the words from array, which have no type
        if (this.meaningsOfTheWord[index].type === undefined) {
          this.meaningsOfTheWord.splice(index, 1);
        } else {
          index++;
        }
      });

      // to make the words with upprecase, which are noun
      this.meaningsOfTheWord.forEach((w) => {
        if (w.type === '{noun}') {
          w.word = w.word.charAt(0).toUpperCase() + w.word.slice(1);
          // artikel
          const Arr = htmlObject
            .getElementsByTagName('div')
            .namedItem('phraseTranslation')
            .getElementsByTagName('span');
          for (let i = 0; i < Arr.length; i++) {
            if (Arr[i].innerHTML.trim() === 'masculine;') {
              w.artikel = 'der';
            }
            if (Arr[i].innerHTML.trim() === 'feminine;') {
              w.artikel = 'die';
            }
            if (Arr[i].innerHTML.trim() === 'neuter;') {
              w.artikel = 'das';
            }
          }
        }
      });

      // when the response is empty, it gives alert 
      if (this.meaningsOfTheWord.length === 0) {
        this.error = true;
      }

      // to make the words with upprecase, which are noun
      this.meaningsOfTheWord.forEach((w) => {
        if (w.type === '{noun}') {
          w.word = w.word.charAt(0).toUpperCase() + w.word.slice(1);
        }
        else {
          this.error = false;
        }
      });
    }, error => {
      if (error) {
        this.error = true;
        this.meaningsOfTheWord = [];
      }
    });
  }

}
