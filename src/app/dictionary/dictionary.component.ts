import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Vocabulary } from '../models/vocabulary';
import { VocabularyService } from '../vocabulary.service';
=======
import { VocabularyService } from '../vocabulary.service'
import { Vocabulary } from '../models/vocabulary';
>>>>>>> 72989d9e7c83e7a784f1e049a48c2b7942a6d72d

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
<<<<<<< HEAD
  
=======
>>>>>>> 72989d9e7c83e7a784f1e049a48c2b7942a6d72d
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


<<<<<<< HEAD
=======

>>>>>>> 72989d9e7c83e7a784f1e049a48c2b7942a6d72d
}
