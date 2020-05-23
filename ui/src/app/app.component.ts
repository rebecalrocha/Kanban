import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-layer';
  constructor(private authentication: AuthService, private router: Router) {
    router.events.subscribe((val) => {
      // sessionStorage.clear();
  });
  }

  messages() {
    return JSON.parse(sessionStorage.getItem('messages'));
  }

  removeMessage(index) {
    let messages = JSON.parse(sessionStorage.getItem('messages'));
    messages.splice(index, 1);
    sessionStorage.setItem('messages', JSON.stringify(messages)); 
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
