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
    this. GetLevelWordsForQueryFromDirectMyWordFunction();    
  }

  GetLevelWordsForQueryFromDirectMyWordFunction(): void{
    this.route.queryParamMap.subscribe(param => {
      const group = param.get('group');
      if (group) {
        this.vocabularyService.GetLevelWords(+group);
        this.router.navigate(['/learnedwords']);
      }
    })
  }
}
