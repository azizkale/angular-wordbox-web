import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { VocabularyService } from '../vocabulary.service';

@Component({
  selector: 'dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

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
