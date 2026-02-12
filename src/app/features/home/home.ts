import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, AfterViewInit {
  
  // --- PROPIEDADES EFECTO ESCRITURA (HERO) ---
  roles: string[] = ['DESARROLLADORA FULL STACK', 'DISEÑADORA GRÁFICA', 'CURIOSIDAD INNATA.'];
  currentRole: string = ''; 
  private roleIndex: number = 0;
  private charIndex: number = 0;
  private isDeleting: boolean = false;

  // --- PROPIEDADES PROYECTOS Y DISEÑO ---
  facet: 'dev' | 'design' = 'dev'; // Controla si mostramos Dev o Diseño
  paintDrops = new Array(15);      // Array para generar las 15 gotas de pintura en el fondo

  constructor(private cdr: ChangeDetectorRef) {} 

  ngOnInit(): void {
    // Iniciamos la máquina de escribir
    setTimeout(() => this.typeEffect(), 500);
  }

  ngAfterViewInit(): void {
    // --- ANIMACIÓN DE ENTRADA PARA TARJETAS DE EXPERIENCIA ---
    const cards = document.querySelectorAll('.experience-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }

  /**
   * Lógica de la máquina de escribir del Hero
   */
  typeEffect(): void {
    const currentFullText = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.currentRole = currentFullText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentRole = currentFullText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentFullText.length) {
      typeSpeed = 2000; 
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeSpeed = 500;
    }

    this.cdr.detectChanges();
    setTimeout(() => this.typeEffect(), typeSpeed);
  }

  /**
   * Cambia entre el portfolio de Programación y el de Diseño
   */
  setFacet(type: 'dev' | 'design'): void {
    this.facet = type;
    this.cdr.detectChanges();
  }
}
