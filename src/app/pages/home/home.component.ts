import { Component, HostListener, signal } from '@angular/core';
import { TasksListComponent } from "../../components/tasks/tasks.component";
import { TasksFilterComponent } from "../../components/tasks-filter/tasks-filter.component";

@Component({
  selector: 'app-home',
  imports: [TasksListComponent, TasksFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  $title = 'My Tasks';
}
