import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authentication: AuthService) { }


  login(email, password){
    this.authentication.login(email, password)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/kanban'])
      });
  }

}
