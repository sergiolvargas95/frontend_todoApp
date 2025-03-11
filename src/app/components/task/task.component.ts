import { Component } from '@angular/core';
import { TodosService } from '../../services/todos/todos.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  todos: any[] = [];
  tasks$: Observable<any[]> = new Observable();

  constructor( private todoService: TodosService  ) {}

  ngOnInit() {
    this.tasks$ = this.todoService.tasks$;
    this.tasks$.subscribe(tasks => {
      this.todos = tasks; 
    })
    this.getAllTodos();
  }

  getAllTodos() {
    let status: string[] = ['open', 'in_progress'];
    this.todoService.getTodos(status);
  }
}
