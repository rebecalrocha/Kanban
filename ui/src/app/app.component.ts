import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  constructor(private authentication: AuthService, private router: Router, private message: MessageService) {}
  currentUser = JSON.parse(localStorage.getItem('currentUser'));


  ngOnInit(): void {
    console.log('user name no app component:  ', this.currentUser.user_name);
    this.name = this.currentUser.user_name;
  }

  messages() {
    return this.message.getMessages();
  }

  remove(index) {
    this.message.removeMessage(index); 
  }

  isLogged(): boolean {
    if (this.authentication.token) {
      return true;
    }
    return false;
  }

  atHome(): boolean{
    if((window.location.pathname == '/home')){
      return true;
    }
    return false;
  }

  logout(){
    this.authentication.logout();
    this.router.navigate(['/login']);
  }
}
