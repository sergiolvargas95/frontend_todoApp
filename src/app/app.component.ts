import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    isLeftSidebarCollapsed = signal<boolean>(false);
    screenWidth = signal<number>(window.innerWidth);
  
    @HostListener('window:resize')
    onResize() {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }

    constructor(private router: Router) {

    }
  
    ngOnInit(): void {
      this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
    }
  
    changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
      this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
    }

    showNavbar(): boolean {
      return this.router.url !== '/login' && this.router.url !== '/register';
    }
}
