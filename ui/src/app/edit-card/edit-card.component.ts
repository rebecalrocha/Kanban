import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) { }

  @Input() card;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  url = 'http://localhost:3000';
  flag = false;

  edit(){
    this.flag = true;
    let body = {"description": this.card.description }
    
    this.http.put(this.url+'/cards/'+this.card._id, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
      .subscribe((data: any) => {
        console.log('data: ', data);
        this.activeModal.dismiss('Cross click');
      },
      (err) => {
        console.log('error: ', err);
      });    
  }

}
