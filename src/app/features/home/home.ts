import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  roles: string[] = [
    'DESARROLLADORA FULL STACK', 
    'DISEÑADORA GRÁFICA', 
    'Curiosidad innata. Superarè.'
  ];
  
  currentRole: string = 'S'; 
  private roleIndex: number = 0;
  private charIndex: number = 1;
  private isDeleting: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {} 

  ngOnInit(): void {
    setTimeout(() => this.typeEffect(), 500);
  }

  typeEffect(): void {
    const currentFullText = this.roles[this.roleIndex];
    
    if (this.isDeleting) {
      this.currentRole = currentFullText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentRole = currentFullText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    this.cdr.detectChanges();

    let typeSpeed = this.isDeleting ? 40 : 120;

    if (!this.isDeleting && this.charIndex === currentFullText.length) {
      typeSpeed = 2000; 
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.typeEffect(), typeSpeed);
  }

  verSkills(): void {
  const el = document.getElementById('skills');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  }
}