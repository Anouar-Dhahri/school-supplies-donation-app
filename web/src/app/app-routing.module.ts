import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { RequestsComponent } from './views/requests/requests.component';
import { RequestFormComponent } from './views/request-form/request-form.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  { path:'', component:LoginComponent, pathMatch:'full' },  
  { path:'admin', component:AdminLayoutComponent, 
    children:[
      { path:'users', component:UsersComponent },

      { path:'requests', component:RequestsComponent},
      { path:"requestform/:action/:id", component:RequestFormComponent },
      { path:"requestform/:action/:id", component:RequestFormComponent },
      { path:'profile', component:ProfileComponent },
    ] 
  },{ path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
