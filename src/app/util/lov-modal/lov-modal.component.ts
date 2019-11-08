import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LovService } from '../services/lov.service';


@Component({
  selector: 'app-lov-modal',
  templateUrl: './lov-modal.component.html',
  styleUrls: ['./lov-modal.component.scss']
})
export class LovModalComponent implements OnInit {
  closeResult: string;
  constructor(private modalService :  NgbModal, private lovService : LovService) { }
  headerClass = 'infoHeader';
  ngOnInit() {

    this.lovService.currentMessage.subscribe((message)=>{} )
  }

  close() {
    this.lovService.closeMessage()
  }

}
