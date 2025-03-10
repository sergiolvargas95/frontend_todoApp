import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor( private http:HttpClient) { }

  getTodos(status:string[]) {
    let url = `${environment.apiUrl}/todos`;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<Task[]>(url);
  }
}
