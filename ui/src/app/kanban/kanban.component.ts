import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CreateCardComponent } from '../create-card/create-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../services/message.service';
import { EditBoardComponent } from '../edit-board/edit-board.component';
import { BoardService } from '../services/board.service';
import { CardService } from '../services/card.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class KanbanComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, private router: Router, private authentication: AuthService, private boardService: BoardService, private cardService: CardService, private modalService: NgbModal, 
    private activatedRoute: ActivatedRoute, private message: MessageService) { }

  todo=[]; doing=[]; done=[];
  board_id: string;
  board_title: string;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
    .subscribe((params: any) => {
      if (params.params.board_id)
       this.board_id = params.params.board_id;
       this.board_title = params.params.board_title; //ao editar title
    });
    this.getCards();
  }

  ngOnDestroy() {
    // remove the class form body tag
    this._document.body.classList = [];
  }


  getTheme(img){
    this._document.body.classList.add('bodybg-'+img);
  }

  editTheme(img){
    this._document.body.classList = [];
    let body = { 'theme': img };
    this.boardService.editTheme(this.board_id, body)
    .subscribe((data: any) => {
      console.log('board editado:  ', data);
      this._document.body.classList.add('bodybg-'+img);
    });   
  }

  getCards(){
    this.boardService.getBoard(this.board_id)
    .subscribe((data: any) => {
      this.board_title = data.title;
      this.getTheme(data.theme);
      data.task.todo.map(card => { this.todo.push(card); });
      data.task.doing.map(card => { this.doing.push(card); });
      data.task.done.map(card => { this.done.push(card); });
    },
    (err) => {
      console.log('erro do get Cards: ',err);
      this.authentication.logout();
      this.router.navigate(['/login'])
    });
  }

  createCard(status) {    
      const modalRef = this.modalService.open(CreateCardComponent, {centered: true});
      modalRef.componentInstance.status = status;
      modalRef.componentInstance.board_id = this.board_id;


      //insere novo card na página
      modalRef.componentInstance.event.subscribe(result => {
        // if (status == "todo"){
        //   this.todo.push(result);
        // }
        // else if (status == "doing"){
        //   this.doing.push(result);
        // } 
        // else if (status == "done")
        //   this.done.push(result);
        this[status].push(result);
      });
  }

  editCard(card) {
    const modalRef = this.modalService.open(EditCardComponent, {centered: true});
    modalRef.componentInstance.card = card;
  }

  deleteCard(item){
    this.cardService.deleteCard(item._id)
    .subscribe((data: any) => {
    });

    //remove card da página
    // if (item.status == "todo") {
    //   let index = this.todo.findIndex(card => card._id == item._id);
    //   this.todo.splice(index,1);
    // }
    // else if (item.status == "doing") {
    //   let index = this.doing.findIndex(card => card._id == item._id);
    //   this.doing.splice(index,1);
    // }
    // else if (item.status == "done") {
    //   let index = this.done.findIndex(card => card._id == item._id);
    //   this.done.splice(index,1);
    // }
    let index = this[item.status].findIndex(card => card._id == item._id);
    this[item.status].splice(index,1);

  }

  //troca card de status se ocorrer drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else { 
      let body = {"status": event.container.id}
      this.cardService.editCardStatus(event.item.data, body);

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  editTitle(){
    const modalRef = this.modalService.open(EditBoardComponent, {centered: true});
    modalRef.componentInstance.board_id = this.board_id;
    modalRef.componentInstance.board_title = this.board_title;
  }

  deleteBoard(){
    this.boardService.deleteBoard(this.board_id)
    .subscribe((data: any) => {
      this.message.createMessage('primary', data.message);
      this.router.navigate(['/home'])
    },
    (err) => {
      console.log('erro ao editar: ', err);
    });
  }

}
