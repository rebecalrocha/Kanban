import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {KanbanComponent} from './kanban/kanban.component';
import {SettingsComponent} from './settings/settings.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'kanban', component: KanbanComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
