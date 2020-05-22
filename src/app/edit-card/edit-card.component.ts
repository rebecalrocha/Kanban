import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {}

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, public dialogRef: MatDialogRef<EditCardComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    description: string;
    card_id: string;
    url = 'http://localhost:3000';

  ngOnInit(): void {
    this.http.get(this.url+'/cards/'+this.data["card"])
    .subscribe((data: any) => {
      //console.log(data.description);
      //{_id: "5ec3e7de6e43d602cc8b3306", description: "ha ha ho hu", status: "todo", owner: "5ec3e7696e43d602cc8b3304", __v: 0}
      this.card_id = data._id;
      this.description = data.description;
    });
  };

  edit(){
    let body = {"description": this.description }
    this.http.put(this.url+'/cards/'+this.card_id, body)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/kanban']);
      });      
  }

      
  cancel(){
    this.router.navigate(['/kanban']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  };



}
