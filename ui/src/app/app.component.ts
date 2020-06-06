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
  currentUser: any;

  ngOnInit(): void {
    // this.validated();
    console.log('app.component init');
    
  }

  getName() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      return this.currentUser.user_name;
    }

    return '';
  }

  validated(){
    this.authentication.verifyToken()
    .subscribe((data: any) => {
      console.log('data: ',data);
    },
    (err) => {
      console.log('erro: ', err);
      this.logout();
      return;
    });
    
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
