import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent {

  constructor(private router: Router, private boardService: BoardService, public activeModal: NgbActiveModal) { }
  title: string;
  flag = false;
  alreadyExists = false;
  error: string;

  create(){
    this.flag = true;
    let body = { 'title': this.title };
    this.boardService.createBoard(body)
    .subscribe((data: any) => {
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/kanban'], { queryParams: { board_id: data.data._id, board_title: data.data.title } })
    },
    (err) => {
      this.error = err.error.message;
      this.alreadyExists = true;
    });   
  }

}
