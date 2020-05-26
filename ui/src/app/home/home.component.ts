import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boards = [{title:'uno', _id:'ytytdcvbnjhgf'}, {title:'tres', _id:'ewazxcvbnmh'}, {title:'uno', _id:'ytytdcvbnjhgf'}, {title:'dos', _id:'uhgfszxcvbjh'}, {title:'tres', _id:'ewazxcvbnmh'}, {title:'uno', _id:'ytytdcvbnjhgf'}, {title:'dos', _id:'uhgfszxcvbjh'}];

  constructor() { }

  ngOnInit(): void {
  }

  goToBoard(board_id){
    console.log(board_id);
  }

}
