import { Component, OnInit } from '@angular/core';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boards = [];

  constructor(private router: Router, private modalService: NgbModal, private userService: UserService) { }
  boardTheme = []

  ngOnInit(): void {
    this.getBoardsFromUser();
  }

  getBoardsFromUser(){
    this.userService.getBoards()
    .subscribe((data: any) => {
      data.map(board => { this.boards.push(board); });
      data.map(board => { this.boardTheme.push(board.theme); });
    },
    (err) => {
      this.router.navigate(['/login']);
    })
  };

  goToBoard(board){
    this.router.navigate(['/kanban'], { queryParams: { board_id: board._id } })
  }

  createBoard(){
    this.modalService.open(CreateBoardComponent, {centered: true});
  }

}
