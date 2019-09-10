import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { MatSort, MatSnackBar} from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader} from './sortable.directive';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [BaseService, DecimalPipe]
})

export class DataTableComponent implements OnInit {
  @Input() path: string="test-local";
  @Input() primaryKey: string = "id";
  @Input() logicalUnit: any[]=[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedDataColoumns: any[]=[];
  dataSource = [];
  selectedList = [];
  newRecords : any[]= [];
  editRecords : any[]= [];

  page : number = 1;
  pageSize : number = 25;
  totalPages : number = 0;
  searchTerm : string;
  loading = true;
  selectedCount = 0;
  newRecordFlag = false;
  editRecordFlag = false;
  newRecordData : any;
  durationInSeconds = 5;
  currentNewRecord : any;

  private  number$ = new BehaviorSubject<number>(0);

  constructor(private baseService : BaseService, private _elementRef : ElementRef, private _snackBar: MatSnackBar) { }
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  ngOnInit() {
    //this.displayedDataColoumns = Array.from(this.allDisplayedColumns);
    //this.allDisplayedColumns.unshift('select');'
    this.getData();
   }


  createRange(nNumber){
    var items: number[] = [];
    for(var i = 1; i <= nNumber; i++){
       items.push(i);
    }
    return items;
  }

  changePage(nPpageNumber){
    this.page = nPpageNumber;
    this.getData();
  }

  isChecked(element, index, array){
    return element.isChecked;
  }

  isEdited(element, index, array){
   return element.editingFlag;
  }

  async initRecord(){
    let dataObjString = '{';
    for (let col of this.logicalUnit){
      if(col.dataType != 'selector'){
        dataObjString = dataObjString + '"'+col.columnName+'":"",';
      }else{
        dataObjString = dataObjString + '"'+col.columnName+'":"'+col.selectorValue[0]+'",';
      }
      
    }
    dataObjString = dataObjString + '}';
    dataObjString = dataObjString.replace(',}','}');
    return JSON.parse(dataObjString);
   
  }

  async addRecord(){
    var isValid = await this.validateInput();
    if(isValid){
      this.newRecordFlag = true;
      let obj = await this.initRecord();
      this.newRecords.push(obj);
      this.currentNewRecord = obj;
    }
    
    
  }


  async editRecord(dataRecord){
    if(this.editRecords.length>0){
      this.editRecords.filter(this.isEdited)[0].editingFlag = false;
    }
    dataRecord.editFlag = true;
    dataRecord.editingFlag = true;
    this.editRecordFlag = true;
    this.editRecords.push(dataRecord);
  }

   async editSelectedRecord(){
    var dataRecord = this.dataSource.filter(this.isChecked)[0];
    if(this.editRecords.length>0){
      this.editRecords.filter(this.isEdited)[0].editingFlag = false;
    }
    dataRecord.editFlag = true;
    dataRecord.editingFlag = true;
    this.editRecordFlag = true;
    this.editRecords.push(dataRecord);
   }
  async saveRecords(){
    if(this.newRecords.length>0){
      var isValid = await this.validateInput();
      if(isValid){
      this.saveData(this.newRecords);
      }
    }

    if(this.editRecords.length>0){
      this.saveData(this.editRecords);
    }

    
  }


  async deleteRecords(){
    var checkedData =  this.dataSource.filter(this.isChecked);
    var i = checkedData.length;
    for (let data of checkedData){
      this.deleteData(data);
      i--;
      if(i == 0){
        this.getData();
      }
    }
   
   }

 
  getData(){
    this.dataSource = null;
    this.baseService.serviceGet(this.path+'?page='+this.page+'&pageSize='+this.pageSize).subscribe(result=>{
    this.dataSource = result.content;
    this.dataSource.map(v => v.isChecked = false)
    this.dataSource.map(v => v.editFlag = false)
    this.dataSource.map(v => v.editingFlag = false)
    this.totalPages = result.totalPages;
    this.loading = false;
    this.selectedCount = 0;

   });
  }

  async saveData(data){
    this.baseService.servicePost(this.path,data).subscribe((response) => {
      //console.log("Success");
      this.refresh();
      
      this.showAlert("Saved Successfully", 'Ok');
    }, (err) => {
      this.showAlert("Error Occured", 'Ok');
    });
  }

  deleteData(data){
    this.baseService.serviceDelete(this.path+'?id='+data[this.primaryKey]).subscribe((response) => {
      //this.showAlert("Deleted Successfully", 'Ok');
      this.refresh();
    }, (err) => {
    });
  }

  
  checkValue(event: any){
    if(event.isChecked){
      event.isChecked = false;
      this.selectedCount = this.selectedCount-1;
    }else{
      event.isChecked = true;
      this.selectedCount = this.selectedCount+1;
    }
 }

 refresh(){
  this.getData();
  this.newRecordFlag = false;
  this.editRecordFlag = false;
  this.newRecords = [];
 }

 inputChange(data,name){
  if(data.length==0){
    let element = this._elementRef.nativeElement.querySelector('#'+name);
    element.classList.add("required");   //remove the class
  }else if (data.length > 0){
     let element = this._elementRef.nativeElement.querySelector('#'+name);
     element.classList.remove("required");   //remove the class
  }
 }

 async validateInput(){
   if(this.newRecords.length>0){

    let i = this.logicalUnit.length;
    for (let col of this.logicalUnit){
     
        i--;
        if(col.required){
          if(this.currentNewRecord[col.columnName] == '' || this.currentNewRecord[col.columnName] == null ){
            this.showAlert(col.columnName + ' is required','Ok');
            return false;
          }
        }
        if(i==0){
          return true;
        }
      }
   }else{
     return true;
   }
   
 }

showAlert(message, action){
  this._snackBar.open(message, action, {
    duration: 2000,
    panelClass: ['blue-snackbar']
  });
}


}

