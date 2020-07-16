import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-level',
  templateUrl: './menu-level.component.html',
  styleUrls: ['./menu-level.component.css']
})
export class MenuLevelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  SetMarginButtons() {
    return {
      "my-3": window.innerHeight < 576,
      "btn-info": window.innerHeight > 0,
      "btn": window.innerHeight > 0
    }
  }
}
