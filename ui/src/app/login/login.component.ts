import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authentication: AuthService, private message: MessageService) { }


  login(email, password){
    this.authentication.login(email, password)
      .subscribe((data: any) => {
        this.router.navigate(['/home'])
      },
      (err) => {
        this.message.createMessage('danger', err.error.message);
      });
  }

}
