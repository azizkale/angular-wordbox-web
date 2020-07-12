import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service'

import { Vocabulary } from '../models/vocabulary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  word;
  searchedWord: Vocabulary[];
  ngOnInit(): void {
    this.showVocabulary();
  }

  showVocabulary() {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }
  
  findTheMeaning(word: string) {
    this.searchedWord = new Array<Vocabulary>();
    this.vocabularies.find(w => {
      if (w.word.includes(word))
        this.searchedWord.push(w)
    })



  }


}
