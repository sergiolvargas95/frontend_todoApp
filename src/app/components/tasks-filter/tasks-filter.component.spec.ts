import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFilterComponent } from './tasks-filter.component';

describe('TasksFilterComponent', () => {
  let component: TasksFilterComponent;
  let fixture: ComponentFixture<TasksFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
