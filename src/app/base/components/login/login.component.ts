import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../base.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../shared/styling/styles.scss']
})
export class LoginComponent implements OnInit {
 user : User;
 loginError = false;
 loginErrorMessage = '';
  constructor(private webService : BaseService, private router : Router) { 
    this.user = new User();
  }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      this.router.navigateByUrl("/home");
    }
  }

  login(){
      this.loginErrorMessage = '';
      this.webService.servicePost('users/login',this.user).subscribe((response) => {
        console.log("Success")
        this.user.authdata = window.btoa(this.user.name + ':' + response.responseValue);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigateByUrl("/home");
      }, (err) => {
        if(err.status == 401){
          this.loginErrorMessage = 'Invalid Credentials';
        }else{
          this.loginErrorMessage = 'Server Error';
        }
      });
  }

}
