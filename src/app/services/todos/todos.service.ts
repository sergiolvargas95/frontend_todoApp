import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor( private http:HttpClient) { }

  getTodos() {
    return this.http.get(`${environment.apiUrl}/todos`);
  }
}
