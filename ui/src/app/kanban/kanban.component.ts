import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { CreateCardComponent } from '../create-card/create-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {


  constructor(private http: HttpClient, private modalService: NgbModal) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000'; 
  todo=[]; doing=[]; done=[];

  ngOnInit(): void {
    this.getCards();
  }

  createCard(item_status) {
    console.log(item_status);
    let status;

    if(item_status == "cdk-drop-list-0")
      status = "todo";
    else if (item_status == "cdk-drop-list-1")
      status = "doing"
    else
      status = "done"
    
      const modalRef = this.modalService.open(CreateCardComponent);
      modalRef.componentInstance.status = status;

      modalRef.componentInstance.event.subscribe(result => {
        // this.todo.push(res.data);
        if (result.status == "todo")
          this.todo.push(result);
        else if (result.status == "doing")
          this.doing.push(result);
        else if (result.status == "done")
          this.done.push(result);
      });
  }

  editCard(card) {
    const modalRef = this.modalService.open(EditCardComponent);
    modalRef.componentInstance.card = card;
  }

  getCards(){
    this.http.get(this.url+'/cards', { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      data.todo.map(card => { this.todo.push(card); });
      data.doing.map(card => { this.doing.push(card); });
      data.done.map(card => { this.done.push(card); });
    });
  }

  deleteCard(item){
    if (item.status == "todo") {
      let index = this.todo.findIndex(card => card._id == item._id);
      this.todo.splice(index,1);
    }
    else if (item.status == "doing") {
      let index = this.doing.findIndex(card => card._id == item._id);
      this.doing.splice(index,1);
    }
    else {
      let index = this.done.findIndex(card => card._id == item._id);
      this.done.splice(index,1);
    }

    this.http.delete(this.url+'/cards/'+item._id)
    .subscribe((data: any) => {
      console.log(data);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else { //troca card de task
      let card_id = event.item.data;
      let status;

      if(event.container.id == "cdk-drop-list-0")
        status = "todo";
      else if(event.container.id == "cdk-drop-list-1")
        status = "doing";
      else
        status = "done";

      let body = {"status": status}

      this.http.put(this.url+'/cards/'+card_id, body).subscribe();
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
