import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {

  constructor(private authentication: AuthService,private userService: UserService, private message: MessageService, private router: Router) { }
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  name: string;

  ngOnInit(): void {
    this.name = this.currentUser.user_name;
  }

  changeName(){
    let body = {'name': this.name}
    this.userService.editName(this.currentUser.user_id,body)
    .subscribe((data: any) => {
      console.log('data do change name: ', data);
      this.message.createMessage('primary', data.message);
      this.router.navigate(['/home'])
    }); 
  }

  deleteUser(){
    this.userService.deleteUser(this.currentUser.user_id)
    .subscribe((data: any) => {
      this.message.createMessage('success', data.message);
      this.authentication.logout();
      this.router.navigate(['/login']);
    });
  }

}
