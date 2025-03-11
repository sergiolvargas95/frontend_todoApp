import { Component, ElementRef, EventEmitter, HostListener, Output, signal, ViewChild } from '@angular/core';
import { TasksListComponent } from "../../components/tasks/tasks.component";
import { TasksFilterComponent } from "../../components/tasks-filter/tasks-filter.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { TodosService } from '../../services/todos/todos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [TasksListComponent, TasksFilterComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output() taskAdded = new EventEmitter<void>(); 
  $title = 'My Tasks';
  taskForm!: FormGroup;
  task:Task;
  priorities = ['Low', 'Medium', 'High'];
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoriesService,
    private todoService: TodosService,
  ) {
    this.createTaskForm();
    this.task = new Task();
  }

  ngOnInit() {
    this.getCategories();
  }

  createTaskForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp:any) => {
      this.categories = resp
    });
  }

  addTask() {
    if (this.taskForm.invalid) { return; }

    this.task.title = this.taskForm.get('title')?.value;
    this.task.description = this.taskForm.get('description')?.value;
    this.task.priority = this.taskForm.get('priority')?.value;
    this.task.category_id = this.taskForm.get('category_id')?.value;
    this.task.completed = 0;
    
    this.todoService.createTask(this.task).subscribe(() => {
      this.closeBtn.nativeElement.click();

      Swal.fire({
        icon: 'success',
        title: 'Task added!',
        text: 'The task has been successfully created.'
      });

      this.taskForm.reset();
      
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'error while saving the task',
        text: err.error.error.message
      });
    });
  } 

  get invalidTitle() {
    return this.taskForm.get('title')?.invalid && this.taskForm.get('title')?.touched;
  }

  get invalidPriority() {
    return this.taskForm.get('priority')?.invalid && this.taskForm.get('priority')?.touched;
  }

  get invalidCategory() {
    return this.taskForm.get('priority')?.invalid && this.taskForm.get('priority')?.touched;
  }
}
