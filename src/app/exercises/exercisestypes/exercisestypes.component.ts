import { Component, OnInit } from '@angular/core';
import { VocabularyService } from 'src/app/vocabulary.service';
import { Vocabulary } from 'src/app/models/vocabulary';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercisestypes',
  templateUrl: './exercisestypes.component.html',
  styleUrls: ['./exercisestypes.component.css'],
})
export class ExercisestypesComponent implements OnInit {  
  flip: string;
  constructor(
    private vocabularyService: VocabularyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(par => {
        let group = par.get('group');
        this.vocabularyService.GetLevelWords(+group);
      }
    )
  }

  SetMarginButtons(): object {
    return {
      'my-3': window.innerHeight < 576,
      'btn-info': window.innerHeight > 0,
      btn: window.innerHeight > 0,
    };
  }


  toggleFlip(): void {
    this.flip = 'inactive';
    this.flip = this.flip === 'inactive' ? 'active' : 'inactive';
  }
}
