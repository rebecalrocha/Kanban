import { Component, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent {

  constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) { }
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';
  title: string;
  flag = false;

  create(){
    this.flag = true;
    let body = { 'title': this.title };
    this.http.post(this.url+'/boards', body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      console.log('BOARD CRIADO:  ', data);
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/kanban'], { queryParams: { board_id: data.data._id, board_title: data.data.title } })
    });   
  }

}
