import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  doing = [
    'Check e-mail'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      //console.log('volta para o mesmo estado', event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //console.log('muda de estado', event.previousContainer.id, event.container.id);
      if(event.container.id == "cdk-drop-list-0"){
        console.log("altera status para todo");
      } else if(event.container.id == "cdk-drop-list-1"){
        console.log("altera status para doing");
      } else{
        console.log("altera status para done");
      }
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
