import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CardService {
    constructor(private http: HttpClient) {}
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    url = 'http://localhost:3000/cards'

    createCard(body){
        return this.http.post(this.url, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    editCardDescription(cardId, body){
        return this.http.put(this.url+'/'+cardId, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})

    }
    editCardStatus(cardId, body){
        return this.http.put(this.url+'/'+cardId, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})}).subscribe();

    }
    deleteCard(itemId){
        return this.http.delete(this.url+'/'+itemId, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

}