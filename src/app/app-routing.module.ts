import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {KanbanComponent} from './kanban/kanban.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'kanban', component: KanbanComponent, canActivate: [AuthGuard]},
  {path: '', component: KanbanComponent},
//  {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},


  //senão volta para login
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
