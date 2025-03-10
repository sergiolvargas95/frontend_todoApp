import { Component } from '@angular/core';
import { TodosService } from '../../services/todos/todos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  todos: any[] = [];

  constructor( private todo: TodosService  ) {
    this.getAllTodos();
  }

  getAllTodos() {
    let status: string[] = ['open', 'in_progress'];
    this.todo.getTodos(status).subscribe( (resp:any) => {
      this.todos = resp;
    }); 
  }
}
