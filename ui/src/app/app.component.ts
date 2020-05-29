import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-layer';
  name: string;
  constructor(private authentication: AuthService, private router: Router, private message: MessageService) {}
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';

  ngOnInit(): void {
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

  logout(){
    this.authentication.logout();
    this.router.navigate(['/login']);
  }
}
