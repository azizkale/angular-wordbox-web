import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.CloseNavbarWhenClicked();
  }

  CloseNavbarWhenClicked(): void {
    const navbarItems = document.querySelectorAll('.navbar-nav>li');
    navbarItems.forEach(navbarItem => {
      navbarItem.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        navbar.classList.remove('show');
      });
    });
  }
}
