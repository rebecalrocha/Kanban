import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private authentication: AuthService) { }

  url = 'http://localhost:3000';

  ngOnInit(): void {
  }
  signup(name, email, password){
    let body = {"name": name, "email": email, "password": password}

    this.http.post(this.url+'/signup', body)
      .subscribe((data: any) => {
        console.log(data);

        this.authentication.login(email, password)
          .subscribe(res => {
            if(res) {
              this.router.navigate(['/kanban']);
            }
          });

      });
  }
}
