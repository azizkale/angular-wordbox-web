import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-learnedwords',
  templateUrl: './learnedwords.component.html',
  styleUrls: ['./learnedwords.component.css'],
})

@Injectable()
export class LearnedwordsComponent implements OnInit {
  levelVocabularies: Vocabulary[];
  savedVocabularies: Vocabulary[];

  constructor(
    private vocabularyService: VocabularyService
  ) { }

  ngOnInit(): void {
    this.GetSavedWordsFromLocalStorage();
  }

  GetSavedWordsFromLocalStorage(): void {
    this.savedVocabularies = new Array<Vocabulary>();
    this.savedVocabularies = this.vocabularyService.wordsOfSelectedLevel;
    // this.vocabularyService.wordsOfSelectedLevel
    // .map((word: Vocabulary) => {
    //   this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
    // });   

  }

  GetLevelWords(groupp: number): void {
    // this.savedVocabularies
    //   = this.vocabularyService.GetLevelWords(groupp);
   
    this.savedVocabularies= [];
      this.vocabularyService.getVocabularies()
      .subscribe((data) => {
        data.map((voc) => {
          voc.group === groupp
            ?  this.savedVocabularies.push(JSON.parse(localStorage.getItem(voc.id.toString())))
            : this.savedVocabularies =  this.savedVocabularies;
        });
      });

     
    
  }




  StarsArray(): Array<object> {
    const array: object[] = new Array(5);
    array.fill(['assets/images/stargray.png', 'assets/images/staryellow.png']);
    return array;
  }

  StarsCSS(): object {
    const Width = window.outerWidth < 400 ? '30%' : '20%';
    return {
      width: Width,
      height: 'auto',
    };
  }
}
