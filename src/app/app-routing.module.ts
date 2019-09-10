import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './base/components/home/home.component';
import { LoginComponent } from './base/components/login/login.component';
import { UserRegistrationComponent } from './base/components/user-registration/user-registration.component';


const routes: Routes = [ 
   { path: 'home',
     component: HomeComponent,
     children: [{ path: 'userRegister', 
                  component: UserRegistrationComponent 
                }]
    },
    { path: '', component: LoginComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
