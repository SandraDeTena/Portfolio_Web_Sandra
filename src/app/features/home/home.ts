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
  
  // --- PROPIEDADES DE LA BIO Y EFECTO DE ESCRITURA ---
  roles: string[] = ['DESARROLLADORA FULL STACK', 'DISEÑADORA GRÁFICA', 'Curiosidad innata. Superarè.'];
  currentRole: string = 'S'; 
  private roleIndex: number = 0;
  private charIndex: number = 1;
  private isDeleting: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {} 

  /**
   * ngOnInit: Se ejecuta al iniciar el componente.
   * Lanza el efecto de escritura con un pequeño retraso inicial.
   */
  ngOnInit(): void {
    setTimeout(() => this.typeEffect(), 500);
  }

  /**
   * ngAfterViewInit: Se ejecuta tras cargar la vista.
   * Configura el IntersectionObserver para animar la trayectoria profesional
   * (INETUM, ADEREN, ENTELGY y VIEWNEXT) cuando aparecen en pantalla.
   */
  ngAfterViewInit(): void {
    const cards = document.querySelectorAll('.experience-card');
    
    const observerOptions = {
      root: null, // usa el viewport del navegador
      rootMargin: '0px 0px -10% 0px', // se activa un poco antes de que la tarjeta asome del todo
      threshold: 0.05 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Una vez visible, dejamos de observar
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    // PLAN B: Si el scroll no se detecta (o por error del navegador), 
    // forzamos la visibilidad de las tarjetas tras 1.5 segundos.
    setTimeout(() => {
      cards.forEach(card => card.classList.add('visible'));
    }, 1500);
  }

  /**
   * typeEffect: Maneja la lógica de la máquina de escribir.
   * Va escribiendo y borrando los roles definidos en el array 'roles'.
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

    this.cdr.detectChanges(); // Forzamos a Angular a detectar el cambio de texto

    let typeSpeed = this.isDeleting ? 40 : 120;

    if (!this.isDeleting && this.charIndex === currentFullText.length) {
      typeSpeed = 2000; // Pausa cuando termina de escribir una frase
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeSpeed = 500; // Pausa antes de empezar la siguiente palabra
    }

    setTimeout(() => this.typeEffect(), typeSpeed);
  }

  /**
   * verSkills: Realiza un scroll suave hasta la sección de habilidades.
   */
  verSkills(): void {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  }

}