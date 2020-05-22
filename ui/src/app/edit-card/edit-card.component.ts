import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {

  constructor(private http: HttpClient, public activeModal: NgbActiveModal) { }

  @Input() card;
  url = 'http://localhost:3000';

  edit(){
    let body = {"description": this.card.description }
    
    this.http.put(this.url+'/cards/'+this.card._id, body)
      .subscribe((data: any) => {
        console.log(data);
        this.activeModal.dismiss('Cross click');
      });    
  }
}
