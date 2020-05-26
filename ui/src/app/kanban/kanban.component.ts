import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CreateCardComponent } from '../create-card/create-card.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})

export class KanbanComponent implements OnInit {

  constructor(private router: Router, private authentication: AuthService, private http: HttpClient, private modalService: NgbModal) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000'; 
  todo=[]; doing=[]; done=[];
  board_title: string;

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    this.http.get(this.url+'/cards', { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      data.todo.map(card => { this.todo.push(card); });
      data.doing.map(card => { this.doing.push(card); });
      data.done.map(card => { this.done.push(card); });
    },
    (err) => {
      this.authentication.logout();
      this.router.navigate(['/login'])
    });

    this.board_title = 'board title amigos';
  }

  createCard(status) {    
      const modalRef = this.modalService.open(CreateCardComponent, {centered: true});
      modalRef.componentInstance.status = status;

      //insere novo card na página
      modalRef.componentInstance.event.subscribe(result => {
        if (status == "todo"){
          this.todo.push(result);
        }
        else if (status == "doing"){
          this.doing.push(result);
        } 
        else if (status == "done")
          this.done.push(result);
      });
  }

  editCard(card) {
    const modalRef = this.modalService.open(EditCardComponent, {centered: true});
    modalRef.componentInstance.card = card;
  }

  deleteCard(item){
    this.http.delete(this.url+'/cards/'+item._id, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      console.log(data);
    });

    //remove card da página
    if (item.status == "todo") {
      let index = this.todo.findIndex(card => card._id == item._id);
      this.todo.splice(index,1);
    }
    else if (item.status == "doing") {
      let index = this.doing.findIndex(card => card._id == item._id);
      this.doing.splice(index,1);
    }
    else if (item.status == "done") {
      let index = this.done.findIndex(card => card._id == item._id);
      this.done.splice(index,1);
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else { //troca card de task
      let card_id = event.item.data;
      let status;

      if(event.container.id == "todo")
        status = "todo";
      else if(event.container.id == "doing")
        status = "doing";
      else if (event.container.id == "done")
        status = "done";

      let body = {"status": status}

      this.http.put(this.url+'/cards/'+card_id, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})}).subscribe();
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
