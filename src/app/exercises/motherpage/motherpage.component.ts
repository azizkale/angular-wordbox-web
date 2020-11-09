import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/vocabulary.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-motherpage',
  templateUrl: './motherpage.component.html',
  styleUrls: ['./motherpage.component.css'],
})
export class MotherpageComponent implements OnInit {
  constructor(
    private vocabularyService: VocabularyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
     
  }
}
