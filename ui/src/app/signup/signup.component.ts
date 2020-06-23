import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private authentication: AuthService, private message: MessageService, private userService: UserService) { }

  ngOnInit(): void {
  }
  signup(name, email, password){
    let body = {"name": name, "email": email, "password": password}

    this.userService.createUser(body)
      .subscribe((data: any) => {
        this.message.createMessage('success', data.message);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.message.createMessage('danger', err.error.message);
      });
  }
}
