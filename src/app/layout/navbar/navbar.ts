import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  toggleView(mode: 'dev' | 'design') {
    const path = mode === 'dev' ? 'proyectos/codigo' : 'proyectos/diseno';
    this.router.navigate([path]);
  }
}