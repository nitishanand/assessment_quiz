import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // Current year to be displayed within footer of app.
  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
