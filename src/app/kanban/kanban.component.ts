import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
//import { MatDialog } from '@angular/material/dialog';
//import { EditCardComponent } from '../edit-card/edit-card.component';

// export interface DialogData {
//   item: string;
// }

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  // item:string;

  constructor(private router: Router, private http: HttpClient,  private activatedRoute: ActivatedRoute/*, public dialog: MatDialog*/) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000'; 
  todo=[]; doing=[]; done=[];

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    this.http.get(this.url+'/cards', { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    .subscribe((data: any) => {
      data.todo.map(card => { this.todo.push(card); });
      data.doing.map(card => { this.doing.push(card); });
      data.done.map(card => { this.done.push(card); });
    });
  }

  // openEditDialog(): void {
  //   this.dialog.open(EditCardComponent, {
  //     width: '250px',
  //     data: {card: this.item}
  //   });
  // }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else { //troca card de task
      let card_id = event.item.data;
      let status;

      if(event.container.id == "cdk-drop-list-0")
        status = "todo";
      else if(event.container.id == "cdk-drop-list-1")
        status = "doing";
      else
        status = "done";

      let body = {"status": status}

      this.http.put(this.url+'/cards/'+card_id, body);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
