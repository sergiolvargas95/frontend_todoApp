import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://todoapp.local/';
  private loggedIn = signal<boolean>(false);

  constructor( private http: HttpClient) { 
    this.checkToken();
  }

  login(user: User) {
    const authData = {
      email: user.email,
      password: user.password
    };

    return this.http.post(`${this.url}login`, authData, { observe: 'response' }).pipe(
      map(resp => {
        const token = resp.headers.get('Authorization');
        if (token) {
          this.saveToken(token);
          this.loggedIn.set(true);
        }

        const user = JSON.parse(JSON.stringify(resp.body));
        this.saveUser(user.user);

        return resp.body;
      })
    );
  }

  private saveToken( token: string ) {
    localStorage.setItem('token', token);
  }

  private saveUser( user: User ) {
    localStorage.setItem('name', user.name);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('profilePicture', user.profilePicture);
  }

  registerUser( user: User ) {
    const authData = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword
    }

    return this.http.post(`${this.url}register`, authData);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.set(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn();
  }

  private checkToken() {
    const token = localStorage.getItem('auth_token');
    this.loggedIn.set(!!token);
  }
}
