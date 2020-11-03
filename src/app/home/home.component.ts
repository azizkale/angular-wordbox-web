import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}


  ngOnInit(): void {
  }

  SetMarginButtons(): object {
    return {
      'my-3': window.innerHeight < 576,
      'btn-info': window.innerHeight > 0,
      btn: window.innerHeight > 0,
    };
  }

  
}

