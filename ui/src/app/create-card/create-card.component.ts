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

  @Input() status;
  public event: EventEmitter<any> = new EventEmitter();
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';
  description: string;

  create(){
    console.log(this.status, this.description);
    let body = { "description": this.description, "status": this.status };
    this.http.post(this.url+'/cards/', body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
      .subscribe((data: any) => {
        console.log(data.data);
        this.triggerEvent(data.data);
        this.activeModal.dismiss('Cross click');
      });      
  }

  triggerEvent(data) {
    this.event.emit(data);
  }
}
