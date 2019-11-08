import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LovService {
  private messageSource = new BehaviorSubject('default message');
  private lovTypeSource = new BehaviorSubject('{"code" : "info"}');
  currentMessage = this.messageSource.asObservable();
  currentLovType = this.lovTypeSource.asObservable();
  constructor() { }

  closeMessage() {
    this.messageSource.next('close')
  }

  alertError(message,additonalDetails){
    this.lovTypeSource.next('{"code" : "error","alertText" : "'+message+'","data":"'+additonalDetails+'"}');
  }

  alertWarn(message){
    this.lovTypeSource.next('{"code" : "warn","alertText" : "'+message+'"}');
  }
}
