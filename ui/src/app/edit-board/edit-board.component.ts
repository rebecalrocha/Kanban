import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent {

  constructor(private router: Router, private http: HttpClient, public activeModal: NgbActiveModal) { }
  @Input() board_id; board_title;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';
  title: string;
  flag = false;

  edit(){
    this.flag = true;
    let body = { 'title': this.board_title };
    this.http.put(this.url+'/boards/'+this.board_id, body)
    .subscribe((data: any) => {
      console.log('board editado:  ', data);
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/kanban'], { queryParams: { board_id: data.data._id, board_title: data.data.title } })
    });   
  }

}
