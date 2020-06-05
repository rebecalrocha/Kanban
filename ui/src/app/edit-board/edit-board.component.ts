import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent {

  constructor(private router: Router, private boardService: BoardService, public activeModal: NgbActiveModal) { }
  @Input() board_id; board_title;
  flag = false;

  edit(){
    this.flag = true;
    let body = { 'title': this.board_title };
    this.boardService.editTitle(this.board_id, body)
    .subscribe((data: any) => {
      this.activeModal.dismiss('Cross click');
      this.router.navigate(['/kanban'], { queryParams: { board_id: data.data._id, board_title: data.data.title } })
    });   
  }

}
