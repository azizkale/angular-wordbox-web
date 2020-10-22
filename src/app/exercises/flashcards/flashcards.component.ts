import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';
import { MeaningsOfTheWord } from 'src/app/models/meaningsOfTheWord';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class FlashcardsComponent implements OnInit {
  levelVocabularies: Vocabulary[];
  shownWord: Vocabulary;
  surchedWord: string;
  wordsToLearn: Vocabulary[];
  savedVocabularies: Vocabulary[];
  showMe: boolean;
  screenWidth: number;

  meaningsOfTheWord: MeaningsOfTheWord[] = [];
  types: string[];

  constructor(private vocabularyService: VocabularyService) { }

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.SaveAllWords();
    this.SetWordsToLearn();
    this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
    this.showMe = true;
    this.screenWidth = window.outerWidth;
  }

  GetLevelWordsFromJSON(): void {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  SaveAllWords(): void {
    // saves the words to localstorage if it was be not saved before
    this.levelVocabularies.map((wrd) => {
      if (localStorage.getItem(wrd.id.toString()) === null) {
        localStorage.setItem(wrd.id.toString(), JSON.stringify(wrd));
      }
    });
  }

  // GetSingleWordFromLocalStorage(index: string): object {
  //   return JSON.parse(localStorage.getItem(index));
  // }

  GetSavedWordsFromLocalStorage(): void {
    this.savedVocabularies = new Array<Vocabulary>();
    this.levelVocabularies.map((word: Vocabulary) => {
      this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
    });
  }

  SetWordsToLearn(): void {
    this.GetSavedWordsFromLocalStorage();
    this.wordsToLearn = new Array<Vocabulary>();
    this.savedVocabularies.map((wrd: Vocabulary) => {
      if ((wrd.showCount == null || wrd.showCount < 6) && this.wordsToLearn.length < 10) {
        this.wordsToLearn.push(wrd);
      }
    });
  }

  // DynamicCSS(): { 'col-12': boolean, 'col-8': boolean } {
  //   return {
  //     'col-12': window.outerWidth < 576,
  //     'col-8': window.outerWidth >= 576,
  //   };
  // }

  StarsArray(): Array<object> {
    const array: object[] = new Array(5);
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png']);
    return array;
  }

  CardAnimation(shownword: Vocabulary): void {
    document.querySelector('.card').classList.toggle('is-flipped');

    if (!document.querySelector('.card').classList[2]) {
      this.shownWord.showCount = !this.shownWord.showCount ? 0 : this.shownWord.showCount;
      shownword.showCount++;
      localStorage.setItem(shownword.id.toString(), JSON.stringify(shownword));
      setTimeout(() => {
        // changes shownWord to next one
        this.shownWord = this.wordsToLearn[Math.floor(Math.random() * 10)];
      }, 1000);
      this.SetWordsToLearn();
      this.showMe = true;
    } else {
      this.showMe = false;
    }
    this.meaningsOfTheWord = [];
  }

  WordsProgressBarHeight(): { progress: boolean } {
    return {
      progress: window.outerWidth < 576,
    };
  }

  SentencesFromGlosbe(word): void {
    let arr = word.split(' ');
    // the function above cut the phrase into words so to get the word without "Artikel"
    this.surchedWord = arr.length >= 2 ? arr[1] : arr[0];
    arr = [];
    this.vocabularyService.getFromGlosbe(this.surchedWord).subscribe((data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

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
        this.meaningsOfTheWord[index].word = this.surchedWord;
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
    });
  }

  NoResponse(): void {
    if (this.meaningsOfTheWord.length === 0) {
      // TODO : Popup message would be better for user.
      alert('Üzgünüz bir sonuç bulamadık!');
    }
  }
}
