import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from './model/user';
import { SortDirection } from '../util/data-table/sortable.directive';


const endpoint = 'http://127.0.0.1:8080/';
interface SearchResult {
  data: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  private user:User;

  constructor(private http: HttpClient) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Storage User '+localStorage.getItem('currentUser')) 
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  serviceGet(apiEndpoint): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization' : `Basic ${this.user.authdata}`
        })
      };
      return this.http.get(endpoint + apiEndpoint,httpOptions).pipe(
      map(this.extractData));
    }


  servicePost (apiEndpoint, inputData ): Observable<any> {
    if(apiEndpoint == 'users/login'){
      let httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-type': 'application/json',
          })
        };
      return this.http.post<any>(endpoint + apiEndpoint, JSON.stringify(inputData), httpOptions).pipe(
        //tap((product) => console.log(`added Loan w/ id=${product.loanAmnt}`)),
        catchError(this.handleError)
      );
    }else{
      let httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization' : `Basic ${this.user.authdata}`
          })
        };
      return this.http.post<any>(endpoint + apiEndpoint, JSON.stringify(inputData), httpOptions).pipe(
        //tap((product) => console.log(`added Loan w/ id=${product.loanAmnt}`)),
        catchError(this.handleError)
      );
    }
    
  }


  serviceDelete (apiEndpoint): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization' : `Basic ${this.user.authdata}`
          })
        };
      return this.http.delete<any>(endpoint + apiEndpoint, httpOptions).pipe(
        // tap((product) => console.log(`added Loan w/ id=${product.loanAmnt}`)),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //onsole.log(errorMessage);
    return throwError(error);
  }
 }
