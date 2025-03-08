import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user = {
    name: localStorage.getItem('name'),
    lastNamme: localStorage.getItem('lastName'),
    imgUrl: localStorage.getItem('profilePicture')
  };

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'myday',
      icon: 'assets/icons/icon-calender.png',
      label: 'My Day',
    },
    {
      routeLink: 'tasks',
      icon: 'assets/icons/icon-tasks.png',
      label: 'My Tasks',
    },
    {
      routeLink: 'categories',
      icon: 'assets/icons/icon-categories.png',
      label: 'My Categories',
    },
    {
      routeLink: 'settings',
      icon: 'assets/icons/icon-settings.png',
      label: 'Settings',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
