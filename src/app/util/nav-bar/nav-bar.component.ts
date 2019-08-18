import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  APP_TOOLBAR_TITLE = 'Oxygon Client';
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
