import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { BaseService } from '../../base.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbdSortableHeader } from '../../../util/data-table/sortable.directive';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  //displayedColumns: string[] = ['name', 'email', 'password', 'status'];
  dataSource = null;
  path ='users';
  logicalUnit = new User().logicalUnit;
  constructor() { }

  ngOnInit() {
  }



}
