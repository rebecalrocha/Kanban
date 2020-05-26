import { Component, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent {

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) { }

  @Input() status; board_id;
  public event: EventEmitter<any> = new EventEmitter();
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';
  description: string;
  flag = false;

  create(){
    this.flag = true;
    let body = { "description": this.description, "status": this.status, "board_id": this.board_id };
    this.http.post(this.url+'/cards', body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
      .subscribe((data: any) => {
        console.log(data);
        this.triggerEvent(data.data);
        this.activeModal.dismiss('Cross click');
      });      
  }

  triggerEvent(data) {
    this.event.emit(data);
  }

}
