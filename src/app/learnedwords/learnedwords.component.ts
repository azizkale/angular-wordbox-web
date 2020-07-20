import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'learnedwords',
  templateUrl: './learnedwords.component.html',
  styleUrls: ['./learnedwords.component.css']
})
export class LearnedwordsComponent implements OnInit {

  levelVocabularies: Vocabulary[];
  savedVocabularies: Vocabulary[];


  constructor(
    private vocabularyService: VocabularyService

  ) { }

  ngOnInit(): void {
    this.GetLevelWordsFromJSON();
    this.GetSavedWordsFromLocalStorage();
  }
  
  GetLevelWordsFromJSON() {
    this.levelVocabularies = this.vocabularyService.wordsOfSelectedLevel;
  }

  GetSavedWordsFromLocalStorage(){
    this.savedVocabularies = new Array<Vocabulary>();
    this.levelVocabularies.map((word:Vocabulary)=>{
      this.savedVocabularies.push(JSON.parse(localStorage.getItem(word.id.toString())));
    })
  }

}
