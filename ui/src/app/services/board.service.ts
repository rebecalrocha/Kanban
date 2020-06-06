import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BoardService {
    constructor(private http: HttpClient) {}
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    url = 'http://localhost:3000/boards'

    createBoard(body){
        console.log('no serviço create board');
        return this.http.post(this.url, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    getBoard(boardId){
        return this.http.get(this.url+'/'+boardId, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    editTitle(boardId, body){
        return this.http.put(this.url+'/'+boardId, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    editTheme(boardId, body){
        return this.http.put(this.url+'/'+boardId, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    deleteBoard(boardId){
        return this.http.delete(this.url+'/'+boardId, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

}