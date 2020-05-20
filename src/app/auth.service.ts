import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: HttpClient) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email, password): Observable<any> {
        return this.http.post('http://localhost:3000/login', JSON.stringify({ email: email, password: password }))
            .pipe(
                map((data: any)  => {
                    let token = data && data.token;
                    if (token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
                    }
                    return data;
                })
            );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}