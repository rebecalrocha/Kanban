import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {

  constructor(private cardService: CardService, public activeModal: NgbActiveModal) { }

  @Input() card;
  flag = false;

  edit(){
    this.flag = true;
    let body = {"description": this.card.description }
    this.cardService.editCardDescription(this.card._id, body)
      .subscribe((data: any) => {
        this.activeModal.dismiss('Cross click');
      },
      (err) => {
        console.log('error: ', err);
      });    
  }

}
