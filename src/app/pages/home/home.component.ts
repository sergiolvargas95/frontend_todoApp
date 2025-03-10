import { Component, HostListener, signal } from '@angular/core';
import { TasksListComponent } from "../../components/tasks/tasks.component";
import { TasksFilterComponent } from "../../components/tasks-filter/tasks-filter.component";
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';

@Component({
  selector: 'app-home',
  imports: [TasksListComponent, TasksFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  $title = 'My Tasks';

  constructor(private dialog: MatDialog) {}

  openTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New Task:', result);
        // Aquí puedes enviar la tarea al backend o agregarla a la lista de tareas
      }
    });
  }
}
