import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    url = 'http://localhost:3000'
    
    createUser(body) {
        return this.http.post(this.url+'/signup', body)
    }

    getBoards() {
        return this.http.get(this.url+'/users', { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    editName(id, body){
        this.currentUser.user_name = body.name;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return this.http.put(this.url+'/users/'+id, body, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

    deleteUser(id) {
        return this.http.delete(this.url+'/users/'+id, { headers: new HttpHeaders({'x-api-key': this.currentUser.token})})
    }

}