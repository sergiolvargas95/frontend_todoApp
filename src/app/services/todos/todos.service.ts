import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task.model';
import { BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor( private http:HttpClient) { }

  getTodos(status:string[]) {
    let url = `${environment.apiUrl}/todos`;
    if (status) {
      url += `?status=${status}`;
    }
    return this.http.get<Task[]>(url).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  createTask(task: Task) {
    const taskData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      category_id: task.category_id,
      completed: task.completed
    }

    return this.http.post(`${environment.apiUrl}/todos`, taskData).pipe(
      tap(() => this.getTodos(['open', 'in_progress']))
    );
  }
}
