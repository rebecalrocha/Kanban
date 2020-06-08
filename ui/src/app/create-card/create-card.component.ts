import { Component, Input, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent {

  constructor(private cardService: CardService, public activeModal: NgbActiveModal) { }

  @Input() status; board_id;
  public event: EventEmitter<any> = new EventEmitter();
  description: string;
  flag = false;

  create(){
    this.flag = true;
    let body = { "description": this.description, "status": this.status, "board_id": this.board_id };
    this.cardService.createCard(body)
      .subscribe((data: any) => {
        this.triggerEvent(data.data);
        this.activeModal.dismiss('Cross click');
      });      
  }

  triggerEvent(data) {
    this.event.emit(data);
  }

}
