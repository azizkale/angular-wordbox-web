import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service'

import { Vocabulary } from '../models/vocabulary';
import { VocabularyDetail } from '../models/vocabulary-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private vocabularyService: VocabularyService) { }

  vocabularies: Vocabulary[];
  word: any;

  getSampleItem: any;

  ngOnInit(): void {
    this.showVocabulary();
    this.getDwdsResult();

    this.vocabularyService.getByIDFromUrl().subscribe((data) => {
      console.log("Item: " + JSON.stringify(data));
      this.getSampleItem = data;
    });

  }

  showVocabulary() {
    this.vocabularyService.getVocabularies().subscribe((data) => {
      this.vocabularies = data;
    });
  }

  AddTestItem() {

    var list: VocabularyDetail[];
    var vd = new VocabularyDetail(32765, 16101, "test", "test", 1);

    this.vocabularyService.addVocabularyTest(new Vocabulary(0,
      5,
      "test",
      "test",
      false,
      false,
      1,
      11,
      "test",
      false,
      11,
      false,
      list)).subscribe(data => {
        console.log('Added: ' + JSON.stringify(data));
      }, error => {
        console.log('Error: ' + JSON.stringify(error));
      });;
  }

  UpdateTestItem() { }

  DeleteTestItem() { }

  getDwdsResult() {
    this.vocabularyService.getFromDwdd().subscribe(data => {
      this.word = data;
      console.log('Success: ' + JSON.stringify(data));
    }, error => {
      console.log('Error: ' + JSON.stringify(error));
    });
  }



}
