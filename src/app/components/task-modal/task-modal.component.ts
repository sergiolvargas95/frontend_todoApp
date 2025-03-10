import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-modal',
  imports: [ MatDialogModule, FormsModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule, MatSelectModule ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  task = { title: '', description: '', priority: 'Medium' };

  constructor(private dialogRef: MatDialogRef<TaskModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  saveTask() {
    if (this.task.title.trim()) {
      this.dialogRef.close(this.task);
    }
  }
}
