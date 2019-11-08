import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LovService } from '../services/lov.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  closeResult: string;
  type: string;

  header: string = 'Information';
  headerClass = 'infoHeader';
  alertText = '';

  constructor(private modalService :  NgbModal, private lovService : LovService) { }
  
  ngOnInit() {

    this.lovService.currentMessage.subscribe((message)=>{} )
    this.lovService.currentLovType.subscribe((type)=>{
       this.handleLovType(JSON.parse(type));
    })
  }

  close() {
    this.lovService.closeMessage()
  }

  handleLovType(type){
    this.type = type;
    if(type.code == 'error'){
      this.headerClass = 'errorHeader';
      this.header = 'Error';
      
    }else if(type.code == 'info'){
      this.headerClass = 'infoHeader';
      this.type = type;
      this.header = 'Information'
      
    }else if(type.code == 'warn'){
      this.headerClass = 'warnHeader';
      this.type = type;
      this.header = 'Warning'
      
    }else if(type.code == 'success'){
      this.headerClass = 'successHeader';
      this.type = type;
      this.header = 'Success'
      
    }
  }

}
