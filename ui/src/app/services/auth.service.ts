import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    public token: string;
    currentUser: any;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentUser && this.currentUser.token;
    }

    login(email, password): Observable<any> {
        let body = {"email": email, "password": password}
        return this.http.post('http://localhost:3000/login', body)
            .pipe(
                map((data: any)  => {
                    let token = data && data.token;
                    if (token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({ token: token, user_id: data.user._id, user_name: data.user.name }));
                    }
                    return data;
                })
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    verifyToken() {
        return this.http.get('http://localhost:3000/auth', { headers: new HttpHeaders({'x-api-key': this.token})});   
    }
}