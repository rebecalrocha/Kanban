import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boards = [];

  constructor(private router: Router, private modalService: NgbModal, private http: HttpClient) { }
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000'; 

  ngOnInit(): void {
    this.getBoardsFromUser();
  }

  getBoardsFromUser(){
    this.http.get(this.url+'/users', { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      data.map(board => { this.boards.push(board); });
    },
    (err) => {
      console.log('erro do get Cards: ',err);
    })
  };

  goToBoard(board){
    this.router.navigate(['/kanban'], { queryParams: { board_id: board._id, board_title: board.title } })
  }

  createBoard(){
    this.modalService.open(CreateBoardComponent, {centered: true});
  }

}
