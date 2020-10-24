import { Component, OnInit } from '@angular/core';
import { Vocabulary } from '../models/vocabulary';
import { VocabularyService } from '../vocabulary.service';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.css'],
})
export class MylibraryComponent implements OnInit {
  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  searchedWord: Vocabulary[];
  word: any;

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
}
