import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-filter',
  imports: [CommonModule],
  templateUrl: './tasks-filter.component.html',
  styleUrl: './tasks-filter.component.scss'
})
export class TasksFilterComponent {
  selectedFilter: string = 'Today';

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }
}
