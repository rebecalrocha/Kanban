import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, public dialogRef: MatDialogRef<CreateCardComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  url = 'http://localhost:3000';
  ngOnInit(): void {
  }

  create(description){
    let body = { "description": description, "status": this.data["card"] };
    this.http.post(this.url+'/cards/', body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/kanban']);
      });      
  }

}
