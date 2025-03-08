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
    this.todo.getTodos().subscribe( (resp:any) => {
      this.todos = resp;
    }); 
  }
}
